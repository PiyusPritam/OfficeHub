import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

// Business rule to calculate performance metrics automatically
export const performanceMetricsCalculator = BusinessRule({
    $id: Now.ID['performance-metrics-calculator'],
    name: 'Performance Metrics Calculator',
    table: 'x_1599224_officehu_attendance',
    when: 'after',
    action: ['insert', 'update'],
    script: `
        try {
            var userId = current.getValue('user');
            var clockIn = current.getValue('clock_in');
            var clockOut = current.getValue('clock_out');
            
            if (!clockOut || !clockIn) return;
            
            var today = new GlideDateTime().getDisplayValue().split(' ')[0];
            
            // Calculate punctuality score
            var scheduledStart = '09:00:00';
            var actualStart = clockIn.split(' ')[1];
            var punctualityScore = calculatePunctualityScore(actualStart, scheduledStart);
            
            // Calculate productivity hours
            var totalHours = parseFloat(current.getValue('total_hours') || '0');
            
            // Store metrics
            storePerformanceMetric(userId, today, 'punctuality_score', punctualityScore);
            storePerformanceMetric(userId, today, 'productivity_hours', totalHours);
            
        } catch (e) {
            gs.error('Error calculating performance metrics: ' + e.message);
        }
        
        function calculatePunctualityScore(actualStart, scheduledStart) {
            var actual = new Date('1970-01-01 ' + actualStart);
            var scheduled = new Date('1970-01-01 ' + scheduledStart);
            var diffMinutes = (actual - scheduled) / (1000 * 60);
            
            if (diffMinutes <= 0) return 100; // Early or on time
            if (diffMinutes <= 5) return 90;  // Up to 5 minutes late
            if (diffMinutes <= 15) return 75; // Up to 15 minutes late
            if (diffMinutes <= 30) return 50; // Up to 30 minutes late
            return 25; // More than 30 minutes late
        }
        
        function storePerformanceMetric(userId, date, metricType, value) {
            var gr = new GlideRecord('x_1599224_officehu_performance_metric');
            gr.addQuery('user', userId);
            gr.addQuery('date', date);
            gr.addQuery('metric_type', metricType);
            gr.query();
            
            if (gr.next()) {
                gr.setValue('value', value);
                gr.update();
            } else {
                gr.initialize();
                gr.setValue('user', userId);
                gr.setValue('date', date);
                gr.setValue('metric_type', metricType);
                gr.setValue('value', value);
                gr.setValue('period', 'daily');
                gr.insert();
            }
        }
    `,
    order: 150,
    active: true,
    condition: "current.clock_out.changes() && current.getValue('clock_out') != ''"
})