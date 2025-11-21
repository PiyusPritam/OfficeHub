import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    ace95a8e83993210bb7910c5eeaad318: {
                        table: 'sys_scope_privilege'
                        id: 'ace95a8e83993210bb7910c5eeaad318'
                    }
                    'achievement-notification-generator': {
                        table: 'sys_script'
                        id: 'f7206c45cd2f414888758318d6b78e39'
                    }
                    ai_chat_activity: {
                        table: 'sys_script'
                        id: '791eab5f3219443789afd6aceaf40abe'
                    }
                    ai_response_generator: {
                        table: 'sys_script'
                        id: '89eba494a4b840e1a075cf531e47518f'
                    }
                    api_max_records: {
                        table: 'sys_properties'
                        id: 'ca9db8f3ce4a4d5095ad8ef3a0ff4cdc'
                    }
                    api_timeout: {
                        table: 'sys_properties'
                        id: 'd8fb7caa281747fba3796ad4a65d7b8f'
                    }
                    attendance_clock_out: {
                        table: 'sys_ui_action'
                        id: '62add252c8c648a7a581d4038038f19a'
                    }
                    attendance_create: {
                        table: 'sys_security_acl'
                        id: 'f8c5bf495ec34efcb57efa23fd77a1c9'
                    }
                    attendance_read: {
                        table: 'sys_security_acl'
                        id: '6d81ee237bcc47a7a1bd1b0944ff334a'
                    }
                    attendance_write: {
                        table: 'sys_security_acl'
                        id: 'e52bab30d21542e899ae4b644be81336'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '35b8da18d32b4d71be4d75d31c61d1ea'
                    }
                    'calculate-attendance-hours': {
                        table: 'sys_script'
                        id: 'cf1203d3765d48a1805c8948ee6d29c9'
                        deleted: true
                    }
                    chat_notifications: {
                        table: 'sys_script'
                        id: '746ad1b97c6147068a0e4db42e3a0800'
                    }
                    chat_room_activity: {
                        table: 'sys_script'
                        id: 'e2fc23c3fed347d8a79bcd71816fd9a5'
                    }
                    comment_mentions: {
                        table: 'sys_script'
                        id: '169df3a5499746ea9811890a02a2e127'
                    }
                    coverage_request_create: {
                        table: 'sys_security_acl'
                        id: 'e45bd651ac594100a9489e70e57ab50e'
                    }
                    coverage_request_read: {
                        table: 'sys_security_acl'
                        id: 'e21dcbdbf3c549c9999c212c5595bfc7'
                    }
                    coverage_request_write: {
                        table: 'sys_security_acl'
                        id: '1de50dc662fa4a85b5dab4040fd46a53'
                    }
                    'coverage-request-notifier': {
                        table: 'sys_script'
                        id: 'bee20eaed7a14f989833a3b6810a4623'
                    }
                    email_notifications_enabled: {
                        table: 'sys_properties'
                        id: '7ecc457e15004f7995c516b72dbd0a9f'
                    }
                    google_calendar_enabled: {
                        table: 'sys_properties'
                        id: '2ba8057b0d6c47f19ea5ec9841e5d86d'
                    }
                    integration_enabled: {
                        table: 'sys_properties'
                        id: 'f40cc4af3a95431c8f86238de2d9ba05'
                    }
                    leave_quick_approve: {
                        table: 'sys_ui_action'
                        id: 'ad30fd19a2e348ccb8260e6105f285e5'
                    }
                    leave_request_create: {
                        table: 'sys_security_acl'
                        id: 'c3b2f3bbd93f4341b9c6c9500091e904'
                    }
                    leave_request_date_validation: {
                        table: 'sys_script_client'
                        id: '3e869ae94d9f4c2cac30cd48f35950b1'
                    }
                    leave_request_info: {
                        table: 'sys_ui_action'
                        id: 'edbdd27e95844e23a6f2f0dace26728b'
                    }
                    leave_request_read: {
                        table: 'sys_security_acl'
                        id: '8bbc029ebb3443b8a6924e4b0bf9082e'
                    }
                    leave_request_write: {
                        table: 'sys_security_acl'
                        id: '1f4a3e47e0ac40c198b454a8b61af888'
                    }
                    'leave-notification-generator': {
                        table: 'sys_script'
                        id: '69a43e76c3524a529a35c389383352bb'
                    }
                    maintenance_enabled: {
                        table: 'sys_properties'
                        id: '3101ed8e70c0438296cd464d19ee4a25'
                    }
                    maintenance_window_end: {
                        table: 'sys_properties'
                        id: '7c5aa02edbde40229008d30d1ab99fac'
                    }
                    maintenance_window_start: {
                        table: 'sys_properties'
                        id: '1928978cdf944ad0a7615cf06c6d70d6'
                    }
                    notification_create: {
                        table: 'sys_security_acl'
                        id: '22f5cd0c8ae24867b621ec23bd64042a'
                    }
                    notification_read: {
                        table: 'sys_security_acl'
                        id: 'b93e338a978547e5a5b6b9482caaea89'
                    }
                    notification_retention_days: {
                        table: 'sys_properties'
                        id: 'd2f497b66d3d44b3bc32d09b3cbdd968'
                    }
                    notification_write: {
                        table: 'sys_security_acl'
                        id: '652614982a4b44d3802f53e8c86a7214'
                    }
                    office365_calendar_enabled: {
                        table: 'sys_properties'
                        id: 'a2ebd8a6b5bf48aeaa74c74223108ceb'
                    }
                    'officehub-main-page': {
                        table: 'sys_ui_page'
                        id: '60b654f37d914d2f80d36879da5d6ee4'
                    }
                    'OfficeHubApp.css': {
                        table: 'sys_ux_theme_asset'
                        id: '0bb634f14e7040fbaffc75b41112b32e'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'a1ca81dffc51402695df393ca57e00e7'
                    }
                    'performance-metrics-calculator': {
                        table: 'sys_script'
                        id: '5f72b50fe4db4135a24fb66fdc8f2b73'
                    }
                    post_interaction_counter: {
                        table: 'sys_script'
                        id: '15cd4abd1aaf49ed9cd5b10ef16b75d9'
                    }
                    'punctuality-checker': {
                        table: 'sys_script'
                        id: '2e716e8d7a7c4d76b6ef02d14959afc0'
                        deleted: true
                    }
                    slack_webhook: {
                        table: 'sys_properties'
                        id: '9966831998a144769610d35ee75e5149'
                    }
                    'smart-notification-generator': {
                        table: 'sys_script'
                        id: 'c23405ac8d2545caa1901c9d39ca13e4'
                    }
                    social_mentions: {
                        table: 'sys_script'
                        id: '9421bb6ff45c4594b38342d51581ba47'
                    }
                    'src_server_attendance-utils_js': {
                        table: 'sys_module'
                        id: 'cb97069e490844cd939b05abe5a436c0'
                    }
                    'src_server_scheduled-maintenance_js': {
                        table: 'sys_module'
                        id: 'f6844cdd77c04f87871f8051234cfc61'
                    }
                    'src_server_social-automation_js': {
                        table: 'sys_module'
                        id: '7386d0f8e36849adb9090878020c319c'
                    }
                    'src_server_wellness-automation_js': {
                        table: 'sys_module'
                        id: '6ca6c982ed4548218005d6f4d335de24'
                    }
                    team_schedule_create: {
                        table: 'sys_security_acl'
                        id: '00c2f761c42d45998b0b1d2cac81a292'
                    }
                    team_schedule_read: {
                        table: 'sys_security_acl'
                        id: 'c4c1362c3ba7459fa986a5493045cd72'
                    }
                    team_schedule_write: {
                        table: 'sys_security_acl'
                        id: 'ad6dc36685164e6ebe581a12aa8f277e'
                    }
                    'team-coverage-updater': {
                        table: 'sys_script'
                        id: '1c48995a376a48ee98c5155ac8be784a'
                    }
                    teams_webhook: {
                        table: 'sys_properties'
                        id: '34974632e39f4e9a9cd2b6269dd7eacf'
                    }
                    timesheet_bulk_approve: {
                        table: 'sys_ui_action'
                        id: '11651716616c4bcbae8a96d623f5201a'
                    }
                    timesheet_create: {
                        table: 'sys_security_acl'
                        id: 'aae22bbe10574145bf9409172b46ff7d'
                    }
                    timesheet_hours_change: {
                        table: 'sys_script_client'
                        id: '3f5a11d86ee44867a6d94ff55a1f125d'
                    }
                    timesheet_onload: {
                        table: 'sys_script_client'
                        id: 'ccc759beaef8437bb43bab43b2d1e05c'
                    }
                    timesheet_read: {
                        table: 'sys_security_acl'
                        id: 'd6fc54a9c95d4f83a5bb5350544d0952'
                    }
                    timesheet_submit: {
                        table: 'sys_ui_action'
                        id: 'b8b01633ff6a495093f42f615b957342'
                    }
                    timesheet_write: {
                        table: 'sys_security_acl'
                        id: '7a99ad64ebe64c6aa6c30b06d09754ed'
                    }
                    wellness_activity_create: {
                        table: 'sys_security_acl'
                        id: 'bc3dcc4f547e4dc589dc83ef0c09c878'
                    }
                    wellness_activity_delete: {
                        table: 'sys_security_acl'
                        id: 'da5379a334594e0d9930be8901fc5b9e'
                    }
                    wellness_activity_onload: {
                        table: 'sys_script_client'
                        id: '9ea8f0376afe46019139beae7a8a3b82'
                    }
                    wellness_activity_read: {
                        table: 'sys_security_acl'
                        id: 'fbe4acd29d9f433ca1991e2ad08a086e'
                    }
                    wellness_activity_value_change: {
                        table: 'sys_script_client'
                        id: 'df082e8022a2426ca7112a56ba1a27cd'
                    }
                    wellness_activity_write: {
                        table: 'sys_security_acl'
                        id: '14524d59648f4be2a3c4ad963b43032c'
                    }
                    wellness_challenge_create: {
                        table: 'sys_security_acl'
                        id: '1dafba01abb04167a3528ac57cf11cd7'
                    }
                    wellness_challenge_onload: {
                        table: 'sys_script_client'
                        id: 'eddb402857294740b35d78eb943a5fe3'
                    }
                    wellness_challenge_read: {
                        table: 'sys_security_acl'
                        id: '64756a15d40247dd971a1f7a5deb7741'
                    }
                    wellness_challenge_write: {
                        table: 'sys_security_acl'
                        id: '671f2ff87e1a450e8ad58773e89d6473'
                    }
                    wellness_enabled: {
                        table: 'sys_properties'
                        id: '5ed23c07d3ea405589021a220f74d522'
                    }
                    wellness_goal_create: {
                        table: 'sys_security_acl'
                        id: 'fc0a2896d06a4ce086f3ae565c4dcada'
                    }
                    wellness_goal_read: {
                        table: 'sys_security_acl'
                        id: '47dae99f66f84030ab626298de8479d7'
                    }
                    wellness_goal_write: {
                        table: 'sys_security_acl'
                        id: 'b80228e9e26344888a001a0a12677497'
                    }
                    wellness_join_challenge: {
                        table: 'sys_ui_action'
                        id: 'f375e8253eb24a2a9759cc55bf05be53'
                    }
                    wellness_leaderboard_create: {
                        table: 'sys_security_acl'
                        id: '2c8c523f6d43455c9fadd688cb1129a4'
                    }
                    wellness_leaderboard_read: {
                        table: 'sys_security_acl'
                        id: '06ca34b39daa4ef7b0a0da5af378dbed'
                    }
                    wellness_leaderboard_updater: {
                        table: 'sys_script'
                        id: '1fa6a787c923431fbdc3e5e7f79706e7'
                    }
                    wellness_leaderboard_write: {
                        table: 'sys_security_acl'
                        id: 'd65325f9786f404d9d756919d04c8527'
                    }
                    wellness_max_daily_points: {
                        table: 'sys_properties'
                        id: 'a3b23b8d9d054a388f9444ea252ece48'
                    }
                    wellness_points_calculator: {
                        table: 'sys_script'
                        id: 'd4efd98034e849fd95004856d60c9168'
                    }
                    wellness_points_multiplier: {
                        table: 'sys_properties'
                        id: 'fc39a00c4cb34e828a64f7d98d1273b0'
                    }
                    wellness_quick_log: {
                        table: 'sys_ui_action'
                        id: 'af98dd068b4d4383a793bf1138119039'
                    }
                    wellness_resource_create: {
                        table: 'sys_security_acl'
                        id: 'a994af28254644efb513083992f32ad1'
                    }
                    wellness_resource_read: {
                        table: 'sys_security_acl'
                        id: '59ee198876a84c4488f144bce4c0441e'
                    }
                    wellness_resource_write: {
                        table: 'sys_security_acl'
                        id: 'e70c023834c94061b26d8694961c2dd9'
                    }
                    'x_1599224_officehu/main': {
                        table: 'sys_ux_lib_asset'
                        id: 'b7af23fbd9a64ff4a2c73c3b73ae2b38'
                    }
                    'x_1599224_officehu/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: 'da89a891549547b28fe223a6d3ef28ea'
                    }
                }
                composite: [
                    {
                        table: 'sys_dictionary'
                        id: '0034b6fd37ad45c99d2b43f4251ff1ae'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'published_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '00489cb82f8b49dc835c7d06b2305cc3'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '009e2c7c39a04305b64884e846620413'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'work_location'
                            value: 'hybrid'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '00b73d758ebf46db91aa83e29995b747'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'parent_comment'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '00d370d0dc9048f79e25e4becee29a20'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'context_type'
                            value: 'technical_support'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '00f0314b31ee4fe29ad73dd1262cd59f'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '01517a01db4b4fb68e615a834f804bb9'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            value: 'stretching'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '015f473e6ccd41228a122bfb1a128ae5'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'period'
                            value: 'quarterly'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0186f0532f6249c88958eba45a261aeb'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'sequence_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '022a6a4dd8eb4b1f9e3194815f15c9f0'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'goal_type'
                            value: 'team'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '022ddb350a814863a63681a9d0bf2152'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'activity_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '024389714c2b452d8b020915469a3bd5'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'employee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '025463c4fa134ec191862d3580209f1b'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '025a11e4e96b4a1d85d7e90b21196421'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'is_read'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0347097a34914b5a90f065c8611a93bf'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'badge_earned'
                            value: 'gold'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0370705d2e2b4cff966ed275ea776f2d'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'is_archived'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '03fb2309af894f2f8f665a2701ead2ad'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '044ad457a2d34ae1873f5075cc1aeabd'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'parent_message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '045ac5e69e7e4aaf866ec41d4204f946'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'requires_login'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '059163029d264f2ea019001f0ccfa736'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'status'
                            value: 'break'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '05ad078376d24f3db56412bf730d5ef7'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'is_read'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '05b014b1346744baa4d54237f85c1d6f'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'achievement_type'
                            value: 'early_bird'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '06392b82634c4c0d8d24e364a1252a58'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'job_title'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '066eebc352f84d21aec69b878e134b3b'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'clock_in'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '06a148dabd4f421dbd5f1f4a8d0eea17'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'target_goal'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '074aad25deec47c3967928f37deacdd0'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'target_audience'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '07c6f784e50f458d8b1b83fda44a67c4'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'is_archived'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '07e1087200414911838c065cc44a71b7'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'activity_type'
                            value: 'meditation_minutes'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '07e3ef0eed444d3a87e4cd9c8b5f7e9c'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '08176509c7cc44ee8974ebc00e7a7bbe'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '08185dc830964ce3a8eac7cf0fa83590'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'interaction_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0841b0d5d6b24744ad2cfe15ba1b6055'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'post_type'
                            value: 'achievement'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0849b8b7a6574fa9b917d59ee6bcbc45'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'activity_type'
                            value: 'active_days'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '08613b8cff244c70935e9e76be0d6724'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'is_active'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '086dc09c8c7c48e8a5fa5cde32f3effe'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'status'
                            value: 'not_started'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '08d6fd2ab29247eeb56bfeb127f3ae49'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '091f9ae731a8415aa0e286c54fb7408a'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'status'
                            value: 'published'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '09836682322642159e661c37575b84f9'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'max_members'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0988c6edbd33494e98bc4fe7912e286b'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_type'
                            value: 'step_challenge'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a21a0f1ac0e4e4f9c1984cd6e5e93c5'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'requester'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0a4313c9a8e34fe580cf822582b1a959'
                        key: {
                            sys_security_acl: 'e70c023834c94061b26d8694961c2dd9'
                            sys_user_role: {
                                id: '2b071810ba5b4d68a4f833dad02550b8'
                                key: {
                                    name: 'x_1599224_officehu.hr_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0aba5a2c90564d6e9eee755ee230db2a'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0afe479e75284d6eb1124a0e264ce004'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'created_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0b1c86baf2584705a5543a21902f8845'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'attachment_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0bc37586a14b4b61917599a16ef28c7e'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'difficulty_level'
                            value: 'beginner'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0bfcdb15b1184c40bd897632ce6dc48c'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'max_streak'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0c2a360f0a764259862979458af840a2'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0c67cef4aa5a4a8088e1dbf9a048b9e5'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0c824f7793574112abab2ee213ce43b3'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_type'
                            value: 'wellness_challenge'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0cb94990cc6540d6a96e02fda7346e4b'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'message_type'
                            value: 'file'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0ce41fd98cf1466b8c6e0902448b417c'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'activity_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0ce8142bcc00422ab6189a9e3f83c8b5'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'message_type'
                            value: 'form_data'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d47d2d23a9c498fa28d2dd9a28ce8aa'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'target_goal'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0dcc5a51eb6c40c3b98cf40ed7abceef'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'end_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0dea9536902f4bf1a0608a3959b44c79'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'is_company_wide'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0e06a962d7f14ac196fb22f5e7834afd'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'message_type'
                            value: 'action_suggestion'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0ee8599731dd4389bb3df6bd8d4cbb66'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'room_type'
                            value: 'private'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0f35eb9238ca4cb5919cecd1bb335815'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'sender_type'
                            value: 'system'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0f78bcfd1f3b4e8999f7eaa2dafef794'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0fd3d15051184d408f1beb459d1141aa'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '105c2000ab94482fa47b400e850b4a70'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'related_record'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '107345658dcd49a384fcb12186dabb61'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'is_premium'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '114040cbe65f4c7e972f24c210b082e2'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'employee'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '116457fada06411ebf1b3340e00c5b56'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'total_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '11e022ce7d24442f868205255e493bb7'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            value: 'achievement'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '11eb59b01eb045549fa96b5086e0c931'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'points_earned'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '11f50d84ed5f4424b4ca0ab976629596'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1231094f6d9e4e618e91830f2eb3ca7f'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'employee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1294c16b1a314f3594a5b0beed2dc6d8'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'escalated_to'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '129eb5904aca41c899437de673e3f0b2'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '12f86d059e024619b7d43eb5770aed00'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '13179841f3814980a28ea05f95003217'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '131e5cb8026b4141a98571cb7e833133'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'level'
                            value: 'gold'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1347b2b562764deb82f022c22e90e9bb'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'current_progress'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '141500176a384bc39cfb3e82f4086db8'
                        key: {
                            sys_ui_action: 'edbdd27e95844e23a6f2f0dace26728b'
                            sys_user_role: {
                                id: '2b071810ba5b4d68a4f833dad02550b8'
                                key: {
                                    name: 'x_1599224_officehu.hr_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '14c4f4daffd74391a3f8894080d0385f'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'participation_status'
                            value: 'disqualified'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '152f80cc78f14128b1c74d79c93358f0'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '154facbfdfb0489baf8d03d0dfbaaa25'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '155118c164894ca29e4d193c5aa0da36'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'target_audience'
                            value: 'remote_workers'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '15a68fc1e05e4535aa9732642aeb00c8'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'urgency'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '162299e8a1b74fb5b22c7517bcf2f6fe'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'goal_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '16d68d87b7c542eda656436ee3f1e41f'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '16e5d3d01c4c42b580fad7dda790a68c'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'department'
                            value: 'sales'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '180915dd83fe4bb1942db4077f1be923'
                        key: {
                            sys_security_acl: 'bc3dcc4f547e4dc589dc83ef0c09c878'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '180ad3887a474397bf762d1727ae73b9'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'member_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '18b838f2fc6c483883cc6e062e69f712'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'employee'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '18c811e6df20402a8a1572dc65d09646'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            value: 'birthday'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1964196dadbe4dfeab4316aa6e14c381'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '19f2db0ebfd94dbdba5cd2f8a420464e'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'goal_title'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1a281d3bedbb4940a411a5daf98273e0'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1a2fa18bebaf4be7b47dcf9255cf5869'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1a67bca78cf84ff8990e65e2f8e47946'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'goal_unit'
                            value: 'points'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1ab913e5ea994790a14d1d69adf4404d'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ad5841d8c094ad598c2d3e70e00255c'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ad850dac9c04bfdbe98703670afc513'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1af05fcd877442d6925ce26de4dda62b'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'progress_percentage'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1bdc1327f1f343ae83f39596ef1896e9'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'billable'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c1d314851bd4d4c95d50b614d65a848'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'intent_detected'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1c2f071ccf044cc28d7fe4cdd43ef8ad'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'notification_settings'
                            value: 'mentions_only'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1cb4b23d45be4115b4e165405b7a374e'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'leaderboard_type'
                            value: 'individual'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1cbdf05e7cb1461a9898d6ce92bf11bb'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'participation_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1cce1a0c8e244441bc3f2527e8e24a00'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'leaderboard_type'
                            value: 'team'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1d393775e4604ad5a2a01764daa3e7e4'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'rank_change'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d3c8468ae0b4844b4a6f9106708d204'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'challenge_participation'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1d4115f748a84db0a71a81c6d51f29f8'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'start_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d838226e2334dd9946c53f6fcde9fc9'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1db77efa9496487780454cfe221c4054'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'message_type'
                            value: 'text'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1e1f2a1f31c24bb9aba1839f7a74e53d'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'priority'
                            value: 'urgent'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1eab5e26c7ee444482ba152dc705bea4'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1ecf0b66359a40439b326512b3a57541'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1ed4873e320e4efab2ec89e8aad8c45a'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            value: 'overtime_alert'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ef698b95886463bb6fc97a569817adc'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1f25eec9da324a6f918078aad1ea0cca'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1f35d3ca939149fabf23084555672f1b'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'is_pinned'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1f3d0295bcd94f40b1bff2681d3ace54'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1fb8cc99c88d461196fbf11ae6b906d9'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'attachment_count'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ff5ea2181ef4d7e8823bd45439c9f0f'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'max_team_size'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '207f4da596eb40428afb4b9cb2f74d55'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'frequency'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2092b88d1651486681d6ab54efd0d4d8'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'language'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '20d14f3094954752974d2c324445a0ac'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '21ae6bbeef1d4193a6328ece84957e3b'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'is_pinned'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '21b002298a3c4985bbdf5d6a7ddcd637'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'registration_deadline'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '21c471c3a21543f293585d8e15d9c88b'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'status'
                            value: 'rejected'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '21ca293fc24d46f7920e1dabd4c3ce70'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'interaction_type'
                            value: 'bookmark'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '222edbc4675a48bca6f2c402e59ca433'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '22681b0b26b245be9e63ab76c80590e0'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'team_challenge'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '22cbc4acafe6416dbf42c7a13a90c3bc'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '22ce20e7209b4754a8c4daaacf4edcf5'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'urgency'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '22ef80df0adb457087a14a20323641eb'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'added_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '238e0684a629415ba93c0a3ba0dbbbe7'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '23a9fa4425654945be798935685f3011'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '23e44e2b69334aa8a90f6d2634bc7965'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '24293c405e2c45d48285bcdb50007928'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'post_type'
                            value: 'team_update'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '242a9d95f21043bda4dc4e0e382f914a'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'is_helpful'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '24c201df1b1a4a41becb2669a856e0e8'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'difficulty_level'
                            value: 'advanced'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '24f49e62b4e44f60a7b9970ac1aef35e'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'billable'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2531ba8f75474e07b3faa72aa7923c0f'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'message_content'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '25c55f1309f44e4b955f52ca38be5275'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'streak_days'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '25cc430d5247434da4d947cac70a1426'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'reaction_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '26530b0ea9694733b2bb8351dcaf83c1'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'metric_type'
                            value: 'task_completion'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2688f294c9094d74aee3439f1671768d'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'priority'
                            value: 'important'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '26eddd8adf8049d78f7bb330c501635c'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'context_type'
                            value: 'general'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2753519452e544449e58555e2117721b'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2772f49ddd074fcd822f2ebe26b3729e'
                        key: {
                            sys_security_acl: '64756a15d40247dd971a1f7a5deb7741'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2783934e86274cc8946be923f76427fd'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '27a34ae7e9d44e57b462a70507ded16a'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'volunteered_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '27d7686147b3421eb23228f2eb4903b3'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'badge_earned'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '283d910f0fde40b3940fbe98fbfced3f'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'post_type'
                            value: 'announcement'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '288cbdf68ac44cf286f08ed97664ee36'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'article'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '28997efa7d4e43a2a84b08bd6aa57805'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'role'
                            value: 'member'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '28d9862fe3dd4f25a583338bcd461507'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'coverage_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '290da8bf83e2490b98858fbb2c87ffec'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'level'
                            value: 'platinum'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '29131d3fd327452e9cce6b1f91f73ac8'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'is_premium'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '29519d59a9e341239a3db117a227ad18'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'department'
                            value: 'hr'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '29967e5b4e054e2ebeee5c63490cce38'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'source_organization'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '29a817c1c63b4f5f8ff445c9ff9ebe09'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'like_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2a19d5bfbf0e4af49fa9c26ea4f9ebad'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'activity_type'
                            value: 'water_intake'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2a1dcd585d6643f6825300dc81bcd84e'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'achievement_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2a9f2a146c3e45bfb174c2459f3a7340'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'status'
                            value: 'lunch'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '2b071810ba5b4d68a4f833dad02550b8'
                        key: {
                            name: 'x_1599224_officehu.hr_admin'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2b46cc5f71c744c88e5233c06ab6a0ae'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'total_activities'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2bca3fc8f99947449ad1674063cd31fb'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_description'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2c8af94aa063448db3f01a4638787b37'
                        key: {
                            sys_security_acl: '1f4a3e47e0ac40c198b454a8b61af888'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2c9790ff8fb7486fb86173d008d2ae54'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'room_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2d24b35c34cf42e08ef65708e0dd4fc0'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'video'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2d43a99e08a74192988d780a79762756'
                        key: {
                            sys_security_acl: '47dae99f66f84030ab626298de8479d7'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2d65b6206aa44f1f85e3259332466a0c'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'device_source'
                            value: 'garmin'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2db4fccbf8a24aa9b1d10f5776002306'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'is_helpful'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2db665ea91ab4260a3301d4447e58443'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'room_type'
                            value: 'department'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2ddd42058c504791a61ef536f7871a08'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'status'
                            value: 'submitted'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2ea377b4c9224489b087c08a4ce40222'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'streak_days'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2f06361384f04bb59a0bfb1d0c6ff8b1'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'is_edited'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2fe6f91b6bd84b4a9494a8310bf5c5a6'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '301daffae5254eddbaa15e6a90928e41'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '302b081410a84b2db377071e126f3019'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'message_count'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '303376c921e64585825ddf7ea5180b06'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3118959ad3284955b8638e9176baff0c'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3136ea3bccff47ba97674be41c9ae5a0'
                        key: {
                            sys_security_acl: 'e52bab30d21542e899ae4b644be81336'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '318ca3187e93450b8a12fbf8d3783f4e'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'participation_status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '31e23d80559b4d7fb2642b7b88a5a11c'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3202efa2ce0b428facfda495030c1a94'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'clock_out'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '32256e29de32478c90992cfe906eec9d'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3259eb86d36d40f4b144ecff89fe3b1b'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'rank_position'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '32bd23deee9e418b95b9751b45d63474'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'shift_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '32eb5a6e3a134b4184c9b1377d453f1a'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'entities_extracted'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '330b8dc067f74d8fbf0a0b34d8aa3aef'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'comment_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '331de796631b44b6aff822fa614b8bd2'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'created_by'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '33302e1342604837879f06e3d2ab74cf'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'goal_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '33b2c743f17a4dd992d04f5654c3906d'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'shift_type'
                            value: 'holiday'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '33eef44fcc3846b7ae4ac2e2107f62a2'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'activity_type'
                            value: 'active_days'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3425edb312fb43bc997c576f799e44bc'
                        key: {
                            sys_security_acl: 'b93e338a978547e5a5b6b9482caaea89'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '352b6d9b8e5c4450b5dcbc7b623ff2ef'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '357bdf029cc8412cb86114cf43c418fe'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '357d96717043469aab61bb981a07ed44'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'activity_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '35935fd18aef4cdc8ff675c507e6b207'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '35af2213cb994170bd14db005a3f013e'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'sleep'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3690397f6ac94a0f99c0831847fcb912'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '36abb4b754974d4cab67af69275bfc10'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_type'
                            value: 'points'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '37f16d530e0c4fc49bb024ef0be830a5'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'rank_change'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '38113595c38649d0ac082be21a194408'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'context_type'
                            value: 'timesheet_help'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3830523115a54789bc8c22ca1146bacb'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3836824c1fc34067a5e0a8ea553ba02e'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'message_type'
                            value: 'text'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '387c19ce5dd74534b750c8c37460fa36'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'achievements_earned'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '393e368c4be24d14b2028e29edf53a4b'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'post_type'
                            value: 'event_reminder'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '39612fa659354a3fb8936a1adba8e1a8'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'status'
                            value: 'active'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '3984ef601e4f4df1847a5491434e3a2e'
                        key: {
                            name: 'x_1599224_officehu.manager'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '399d7699c93d43a1925ace15c4c8430a'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'is_featured'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a0bb4c8b90047fdbfe80bd586d6b36d'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'entities_extracted'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3a0e702578674db8ad81de39f8a1410e'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'compensation_type'
                            value: 'time_off'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3a0fa3ed12da4bcb99e587851cc0a6b3'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a0fd45e9ab347ec9f90c9bf353f55da'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3a21f46137f3463fa8e178b7fa0034f0'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'device_source'
                            value: 'manual'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3a29d51d49d6470ca6ac9f028acaa367'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3a3f5bd52cf74811a08df081f11a749e'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'frequency'
                            value: 'monthly'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3abaa47f60b74e6eba2412567e6732cd'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3b2558e08e6849469e1565c47996b8b5'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'status'
                            value: 'draft'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3b36472dcfd04cc1bae9cd3193d783d9'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'last_activity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3b4854ba192847e1ac4978d6cd12f9ab'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'reply_to_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3b9f7bce6dbc45d6af9f98df52d57e2b'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            value: 'conference'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3ba8bbff254543e0b1bdeb9aa85ac415'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'coverage_required'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3c0906ff0fbd46659e0e2d0bd09639eb'
                        key: {
                            sys_security_acl: 'd6fc54a9c95d4f83a5bb5350544d0952'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '3c233097536e4dd4b8e2b5ddfa2c6626'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3c658dea504d431b8d4d853c721b9a5b'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3c9146f68abe4e89877c46f697baee30'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'message_content'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3cede45ac4b346339a2d02d4fdca55b7'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'frequency'
                            value: 'one_time'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3cef168084f645bea67908f77913b89f'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'manager'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3d3c744047c54dafb49e39e51d387dc1'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_type'
                            value: 'team_lunch'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3d56a4df68544adb8da7e9e46d24a063'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3d7d93d78aa54690b5f46f0ebe94336e'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3d90a5dcbf504b25a3c5ea5b5810e538'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3e6bfe31d37a45dfb5f4c92254277fb8'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'target_audience'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3f9736fcd98e4661ad1683c94619ebab'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'badge_earned'
                            value: 'platinum'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3fd8aa43c41d4b079642bcbae1104931'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'end_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '40147498c75d43b2818923ea288c188b'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'sent_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '404840befe4346808e5151c1b7448840'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '40fe8857cf8946b08b398fc4180467e2'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4112786170484143a9051786cf35e6dd'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'reaction_count'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '41262b9034e04778bc12b70fb8f6aaa0'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'metric_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4168046b06e444acb20375d012955c00'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'requires_approval'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4182789aa7be49f69d863fb6288177c2'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'target_audience'
                            value: 'seniors'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4188951683ad4ebca3b612a5515e77d3'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_type'
                            value: 'wellness_budget'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '41ac0ae7f75b4341bc7a05de01974abd'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'work_location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '422a24be39f94613a283162f2b6b5a47'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4241f0b294e54dbbb8682a40c3fba499'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'processing_time_ms'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4298f0af11b54d7d833687cc8cc7fc92'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4303bf412569498098b8eccd39d11a77'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '431d2f1aed814cb8a1a72c4e838b96cf'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'nutrition'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '438fddaf059f4033bf32340cc8467d45'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_type'
                            value: 'habit_building'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '439b48bbcbc8441f932afb1a1bcb8a27'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'project'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4421d1e2f0684fc69f8b23918d0af525'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'clock_out'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '444dd0d1c85a424aa9e64225b9265caa'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'is_public'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4453d86534514a708418acb1c1fa1d20'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '445571af6a404e768ba285dabe3117b8'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'goal_unit'
                            value: 'steps'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '44644cb259e443988a37405f69be835f'
                        key: {
                            sys_security_acl: '8bbc029ebb3443b8a6924e4b0bf9082e'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '44c7744988ac49859b39365b8bb0ca0f'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'activity_type'
                            value: 'wellness_score'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '44c7de0c19d24de4bcd7178d7e62ae32'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'status'
                            value: 'clocked_out'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '44ced62a1e204caf81f1a4070ef20197'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            value: 'water_intake'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '44d2a33dc7dc4173b35a3ec9635d89e6'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            value: 'yoga'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '453caf6ac03e437da41506cda1c8e26f'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'visibility'
                            value: 'managers_only'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4589fa406c214438b8fb7bc9b3894ac1'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'context_type'
                            value: 'leave_help'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '45c1d47edaa64e8894c3e81d4c1ff816'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'team'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '45ee7dd6971043029dd8355ac3130b06'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'department'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '45fc821d42d44bf59efa848e1df34053'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'team_challenge'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4719e2e399314f59ad18a65c8ae9c118'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '47c01a26ced04cfcaf5bfa618bf8ee7d'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'tags'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '47c71c57c26f404abdcde9ee521b6784'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'priority'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '487f839960164cb985325bc2ca7056f1'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4888caa7fa4249f2a6bceda94a715c98'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'activity_type'
                            value: 'sleep_hours'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '48a225b8113442ae9bb054796c015b24'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '48bf289a2fe947df8fccaa0282e61365'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'volunteered_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '48dcf28626f54e03ba48fa8988011123'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '492a7dd43ddc4d788ac775b2e690c83c'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'author'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4aa14fad9c93436a8b1e87b2c79a5b12'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4ac1087194a343a0b5f5d799a379504d'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'achievement_type'
                            value: 'perfect_attendance'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4b363a8d1fd3424186a8243f423069f4'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'reward_points'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4c75f07f47e84600837e057716ae87af'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'period'
                            value: 'yearly'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '4cfb6e8558b745fa88a18ae432738fa7'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '4d79988a969d41f8b601e0f1b7add2a5'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '4e915beee4af457e81d18b2cdb00427d'
                        key: {
                            role: {
                                id: '923054f14c3f4a6facd463c102626b7b'
                                key: {
                                    name: 'x_1599224_officehu.admin'
                                }
                            }
                            contains: {
                                id: '2b071810ba5b4d68a4f833dad02550b8'
                                key: {
                                    name: 'x_1599224_officehu.hr_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4ea76fe4d48246e583aa123e95bbd444'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'rules_and_guidelines'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4ec641e4371a44f6bef04e896344f6fe'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'mentioned_users'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4f040603affb453688d02d5d06a1adb3'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'is_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4f1c95e19481496ea43d69e75fe4f6d7'
                        key: {
                            sys_security_acl: '1de50dc662fa4a85b5dab4040fd46a53'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4f30ba1927fa4a6587d1a1ae0d7b449c'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_type'
                            value: 'time_off'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4fa496a2720a44d386efb23cfafd7ed5'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'difficulty_level'
                            value: 'all_levels'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4fb3fd8759f5461dab0e612b49a5bd48'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4ff4de1d73494cb79c1296144bc62aea'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4ff5833480b4430c944b548d5eedf49d'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'edited_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '50395d6ae28c420f9837328c9b7faa8b'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5046ea1b5f3344d4abcf8afff367b4cc'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'leaderboard_type'
                            value: 'both'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '50ddde4675fa49558a3723ce01ea281a'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'start_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '514189f4eb7b46969acbf78de67ccfbd'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'is_pinned'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5147050de83244a8b974c4e2401362ac'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'ebook'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5183e87a49654fd4ab8cb54bfb48fbd6'
                        key: {
                            name: 'x_1599224_officehu_event'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '51c575c93ca04e4bb8e6826890a16b6a'
                        key: {
                            logical_table_name: 'x_1599224_officehu_wellness_leaderboard'
                            col_name_string: 'challenge,rank_position'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '51e670f30645492a8145362333acda79'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'total_hours'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5236ac90aef44276a153ca002bd0b0a9'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'max_streak'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '525b9b5d27f0466ca3212608acb1bc92'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '525f9676c1594205b0de65aa12a7dd78'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5322361bc765406abe136e2b51a12392'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'baseline_value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '532723a36ecf4582a95b0a9d4e4cf961'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'is_emergency'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '533e909a89aa4cc48abecfacd7ff661e'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'expires_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5354273480ec4390b00774b925a0ecb4'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'duration_minutes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '53c61a05678b497192d81c5a72ac9e40'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '54626bb91c8a4938b2284102a78de233'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'target_value'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '54ca75f2ae8a4762bf871ba4b721da54'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'leaderboard_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '558e6991513d424cb7430dcaa04e9c6b'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'is_active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '55dc185e3112456faaf91e2b68d809ea'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5626160e9a364f8bb9d3565c98916095'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'work_location'
                            value: 'home'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '565134a05b3d401cb7a0b67c348c14e7'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'current_coverage'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '56d5ea92a2aa4567bc26bda1a01089f4'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '56d638ba680f48b5bdb5dfcec9343025'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'target_audience'
                            value: 'managers'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '57023c66017044508c0a46e31d78e4a2'
                        key: {
                            sys_security_acl: '1dafba01abb04167a3528ac57cf11cd7'
                            sys_user_role: {
                                id: '3984ef601e4f4df1847a5491434e3a2e'
                                key: {
                                    name: 'x_1599224_officehu.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '577e1a2cc01d47e983796269b866c8e2'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'approver'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '58129528e9ab4ae09ba301160887a5df'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'is_featured'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5871b48bc7b74c9b9e3480335c2e8f3a'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '58972d102e03459b81c289bd90b576ce'
                        key: {
                            name: 'x_1599224_officehu.employee'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '58d08bd34a3f4803a1b1b4fb09697d31'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'period'
                            value: 'weekly'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '58d9a594418e48a58119a767979a5ffb'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'organizer'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '58e203e112ec42a99805ffcdee775e22'
                        key: {
                            sys_security_acl: '59ee198876a84c4488f144bce4c0441e'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '58f4f292d8104dcfa0e5ea0b06471a4a'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '58fffd055f554850b1ca76bc9295f61c'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5944486e1edc499faf1f8f574fd9faee'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'last_message_time'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5953feb347ee497db2e1fcb37ab9a61d'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'published_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '598067467bf5456f8ef3ef8917304310'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'attachment_count'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5989248273cd42c8991576ade4eebbd8'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'approval_comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '59941ab343c9488f89af6595fd0b18a6'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5a0f9297036c4cc789e4abe06bd8b6a0'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'context_type'
                            value: 'wellness_coach'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a1a6923481743e7a15c6066249db816'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'coverage_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a41340e5c234eb89cb03e52e8657af4'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'is_active'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5ac27c6a371e464990faeb9ef8cb3d0a'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5ae3ca086f40426c9c81e9ae2fd8854f'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5b5931796e8a4543901cc7cc2aa1ee33'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'webinar'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5b5b0cbe4f4640fb83b74a4954fbd5ec'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'role'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5bc75256720f4f8299b4cb07d8ccaea0'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'device_source'
                            value: 'samsung_health'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5be3873450cb46c999f9e9a1673a0f99'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'organizer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5bf5f25897bb4dec9ab52d51d29d05ef'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '5cc6c4299d784cb3b8628ed768629212'
                        key: {
                            name: 'x_1599224_officehu_notification'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5cdb430cf01846f1862de10b99091ba7'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
                            value: 'vacation'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5d46ed13a94f4ff8bd8f144e3cbb969a'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'expected_hours'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5db4c0726ca34a949dd6a09874b20796'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'original_schedule'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5de2710a7fb34ce5b41a9be017278e53'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'is_public'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e11551a9f9147dcb4d500f1f5ed7065'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'like_count'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e7efe9188e3484ba426d32a3c83624e'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'employee'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5e9441fc4fd44dc48fcfbb579b59d249'
                        key: {
                            name: 'x_1599224_officehu_notification'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5ebb1af7a87745a592fd39e9f77a4605'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'comment_count'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5ef06f2d4d5048ccbe7ecd0cfc3fd333'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            value: 'meeting'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5ef7652789d14183bfb6af7386242678'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'source_organization'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f14bb09992a4b7ab415c498c927c15d'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'target_value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f98e28a89d14292a9aa22a1fe8d7ce8'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5fc5c9fee55b4bac943146a23c2e1466'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'status'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '600dff48e9e543ac9327c2dceb779ad8'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '61c53da53669454ca18a364b18cd18c2'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_type'
                            value: 'no_reward'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '622d9d005fd24b7da4e9d0b56da2ff0b'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '623ea557cfaa445480a207b2a30718ce'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '62d34e0542674db8b8f0551129a65332'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'chat_room'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '634f22866ff44154bfbed83875ddae44'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'urgency'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '64666ebabc0f4357beb1404801e932cf'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'added_by'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6471a3e5e64545929cb12de9c14755c8'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'chat_room'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '64b231f52b984f299c6bed882562cdda'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'last_message_preview'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '64ba975cdbb34d5a9a12ac66b123f6ab'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'scheduled_publish'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '64d767dd54524d268475ef4b126924fb'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'requires_login'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '653b9f8cc07941329ca9e6900b27340f'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'achievement_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '65502522967e42c9ad59db02233ebbf9'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
                            value: 'maternity'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '666202ca8cd3485e9c49c208d2bac422'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'role'
                            value: 'moderator'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '66a93383314a47b4b2db5ffa9fa7a3cd'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'days_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '66c83c118b1844e49cf51e364401de61'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'target_participants'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '671b4be4997c4786866a8f3967030c69'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '67a3f3cbfbee4c9a85126690e85aad14'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '67dac71d6fde4845883772503ad09e63'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'end_time'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '682106d01c104419af3dd83933143a88'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '68687386e7c248b48dd1340c39a7b6e7'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'chat_session'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '68c8242ab7d7406db3c40ac00e81c307'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '68ed841bb19041ab8c1e6f7c94f1c5d4'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'status'
                            value: 'overdue'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6931267b58e2423ba9f156caf3ece84c'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'compensation_type'
                            value: 'overtime_pay'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '694c054f5866422498877320d28a42ea'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '69997ad20cec4edfba49ae3e15dba339'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'current_coverage'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a1bbe40fd224ed198da47300615bbae'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'days_requested'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6a441744e95347ec8bc689d82c096f12'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'post_type'
                            value: 'social'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6a9212923da2465bb7d887492f96eb21'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'approval_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6aa3939255c54b2eaa14ff85c3851e87'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'frequency'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6aa4a67d8da747e69d5e8593c1929849'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'team_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6b2ed8b808444f129b4b29704c011e79'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6b71d1d3739a4de3a35a926cb357a463'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'post_type'
                            value: 'wellness_tip'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6bada60373ca417a87506b680eaa8b59'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6c7fb6ba0e7d417d90c3e12fde1bc0f0'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6d0ff24554cf48d58f21544ff98fcb3c'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'achievement_type'
                            value: 'innovator'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6d7b2b2e25a6420e8c9689f4c308153d'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'member_count'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6d8b351096934913839ff847d5262026'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'reply_to_message'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '6decf2844c3d4cd0b56a77907b271f68'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6df86a11581f47b9a0bf081c5c477b94'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6e0bf0e4506643118ad12ef005727e12'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'stress_management'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6e2bf09205974bb99bbbd293958f049e'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            value: 'timesheet_reminder'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6e5bb71e467241b791a17c9a74270a66'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'urgency'
                            value: 'critical'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6e9230638d4346c2a9159b6c5a3693a9'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'room_type'
                            value: 'public'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6ed5ef3d7ae148a98049eacb8dd0bcc1'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'notification_settings'
                            value: 'none'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6ef3577605464be191d8ed97e7618201'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6f5f21473f1341678dc469ec0a4736b9'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6f8be6131b4341a5864fbb50f406de82'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'department'
                            value: 'it'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6fa3433ddb4a42f6825944296b9fb21a'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'action_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6fb75b52133f40e6b5e6e19c3be60a70'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            value: 'holiday'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7051cc889f6141068ceb5977ae411673'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'general_wellness'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7077b536af644036b4d803b42ce5f09e'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'frequency'
                            value: 'weekly'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '708b0ec07ee7492d84430d8c873d6c7a'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'volunteer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '713a280a90e0494294e41a38e94851c0'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'approved_by'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '715d379b324f4561ac627c9056406061'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '71bf315f053f46e8987362209d3bbfd9'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'message_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7201fbf136a34134b6c5c27094495c29'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'post_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7204b285d3644d578fa070f6fd519714'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7230fd6eae6a4cb483518b3883f08668'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '723916e066e64b478c13e65d55af39ab'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '728f2c9efdd5409b9522d6abc8ecad11'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'rating_average'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72a311250d0b43ecb12882fce2fb5c61'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '72d55f174fef41e39ec8d83358e72d38'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72df7ad88f9b43769bbe8d0624b4c332'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'escalated_to'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '73424230418f45f8ae1e2e4ba9024db4'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '734c768ab1e0484e9d6d9f7abc1b61d8'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'shift_type'
                            value: 'night'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '73537561e5fb429b8522cd5c7be2431e'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'language'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '73b2fab66c994b9a83f6f57c9ca8d662'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '73c7f7552d744e3eb35b447ecb93ef80'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_value'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '73f2eaf5fc4d4c8683bab4616d23081a'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'reward_points'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '73f4bde6ed1e48c49092df3e50758a8b'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'location'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '73fe64babe1b4e23b052a4f07e3d3a28'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'verified'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7479dc2b5ef54106902a3587a6c17cbe'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'status'
                            value: 'archived'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7485ba71f6af4266a30f636cf3f160f8'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'tags'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '74ae43075c6145a99d4a395c5997bf8d'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'content'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '74cc091da9f943e2a99527cf1311e4ac'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'urgency'
                            value: 'medium'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '74fd45f2371041949e14f289fcaac482'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'like_count'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '75edfd4cabeb470996bba10e902e583b'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'goal_unit'
                            value: 'minutes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7720e8d7562e42429033f780ac9f2c0c'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'registration_deadline'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7735901a2b7b42f8a403306028bbb2d6'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'context_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '776f4c0d530d43bd8d9591c605c4553a'
                        key: {
                            sys_security_acl: 'fbe4acd29d9f433ca1991e2ad08a086e'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '778e99c93d664caaafc79f58de487913'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'attachment_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '77c28c4c5ae74308a512a49e82abf83b'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'sent_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '77cdd5695a98401a87072a06c0597c98'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'interaction_type'
                            value: 'comment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7842adb2c77142bb91b6d2369c4b8129'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'organizer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '78c2c90cb7ba4f8fb2c7122530eaee1c'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'period'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '78d0d839a440444487d29ec05e39a14f'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            value: 'sleep'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '78d75fed52e64b92aecf94cbbc823b39'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'tags'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '78e6ae47825b45259a2b6334028e6b2b'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'start_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '78ebc5be23f2415585cf6beb7212e909'
                        key: {
                            sys_security_acl: 'da5379a334594e0d9930be8901fc5b9e'
                            sys_user_role: {
                                id: '2b071810ba5b4d68a4f833dad02550b8'
                                key: {
                                    name: 'x_1599224_officehu.hr_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '78f78a3ae5074e1d8fa4f45525f71829'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'goal_title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '79344fd7c0fc48c19fc1f6618bec2cbb'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_status'
                            value: 'registration_open'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7979ca7de88b437dabde43161d32b2bf'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'goal_unit'
                            value: 'hours'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '79e3dd91615f4d18a1ba12d18c78124c'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'metric_type'
                            value: 'productivity_hours'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7a5c60b2aba543d2958246a10d8547c1'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'leaderboard_type'
                            value: 'none'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7aa4bd9bf335489c9568ba638eec46a2'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'approved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7af444f23b924604bdb489a9e1720435'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'start_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7b0b562dc6d34cc2877d4a81ed6595d3'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'winner_announcement'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '7b8a97c65c2d482893fd95d650dc7e85'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7beb68ab4c8d4a1b85fd032f99d09046'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'goal_type'
                            value: 'company'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7c029e327b074a4e8d9effab9ddbc282'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'room_type'
                            value: 'project'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7c2bbd9adc3a4289967d635d9f4c4ae1'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'is_archived'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7cdadc692983455fbd135b21eba4295c'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'priority'
                            value: 'critical'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7ceb98e201ba4e46b53ae0eec03aa94e'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'priority'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d1e94775bae4828ad89b065801b416c'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d57a1a5dfae48b0b7529f01f61a10cf'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'end_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7dad4e4a90554eedad73789021fa0d82'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'end_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7e1ea606ad5f44f5afcba7194ebd00cf'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'last_updated'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7f062d8ec4f44a9e8b484628eb398992'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'content'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7f9b548fbab74ad59cac533e685f72ae'
                        key: {
                            sys_security_acl: '14524d59648f4be2a3c4ad963b43032c'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7ffe031b1d5b4422853a4a05420d868e'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'author'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '80579d44d57a4e04b2752c0624657e24'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8061e7cb3e284ea8a3fc955403f92ff0'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '80698d51edc24ac3b944454eb28f8a8e'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '80dc426b18844b84b56c7affafb06b5c'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'target_audience'
                            value: 'all_employees'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8106d7ef8cd7441abfbba767d45dbdd5'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'like_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '81961f2e8c3848318a8eff9bd4c34700'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_value'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '81a6586b04e74bada9102a4f70e26a3d'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '81ef199f80234c588b2e9416b7c00be8'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '81f70e2a7a434e208dd3412538f8586b'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'context_type'
                            value: 'hr_questions'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '822270d2801f4c11a6b9c7eae6951cf7'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'is_muted'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '829164c4731c44e49194b9789f70c241'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'difficulty_level'
                            value: 'intermediate'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '82ac3224983a4b31a1458e89e2c73510'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'work_location'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '82df039e09ce48fbabaf4b279b8d6475'
                        key: {
                            sys_security_acl: 'd65325f9786f404d9d756919d04c8527'
                            sys_user_role: {
                                id: '923054f14c3f4a6facd463c102626b7b'
                                key: {
                                    name: 'x_1599224_officehu.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '82fcfa48ccf847f2a43a639c3abe44ba'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '835347f09a2c4d4cadfb20d8a782a77c'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'qualified_for_prize'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '835ace0646e549e59f96a08acc38cf94'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            value: 'walking'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '83674af0fcaf4c0b88f21a3fe0b872fb'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'comment_text'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '838baec487294bdca4d8834b7e4fd84b'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '83fd32d217824e7faf49b95c9055cd7b'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'coverage_required'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '84519d4216a1442980f17a22ab9e19d9'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '84a2af8f590c4292bd6fcccbb5eaaeec'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
                            value: 'unpaid'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '84aad34d03c14969a599632142658309'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'is_featured'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '84b28c62bc464a03874d593d8abe3e25'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'difficulty_level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '84b7c33649804f8ba9ddae6c031f3d60'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '84fe1f1d0c404156874ba8dde68d8c95'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'room_type'
                            value: 'announcement'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '85478f7d430e4ebea9b14021462c1fcc'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'frequency'
                            value: 'yearly'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '855f210461244ad3831715c0ba6b8b44'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'notification_settings'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8569745c0e80472d93282c9680d75a54'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '85b07beb72a346c49035d8064a60e8de'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'context_type'
                            value: 'policy_info'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8621005ee5cc438d87b5d75914900169'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'goal_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '864538157e764449a532d1568ed70057'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8688c9e2c0c14c7a89c2761c852c15fe'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'related_record'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '868f6817cb3e406fad4d5d6b4eb80094'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'is_featured'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '86a4800448c94279a5e06a3dc6aee362'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_type'
                            value: 'nutrition_challenge'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '86dddffa5540421d9b4bc55e7d10739c'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'achievement_type'
                            value: 'team_player'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '86e86eb5f44a4bc494b8238ae77ebb50'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'participation_status'
                            value: 'withdrawn'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '871ddcc772f34350828cbd5e2626cd9c'
                        key: {
                            sys_security_acl: 'f8c5bf495ec34efcb57efa23fd77a1c9'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '872a1eebb8b64b25953ee975caaff8b5'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'device_source'
                            value: 'fitbit'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '873ed91e5c6a46038826f17c2e487c97'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
                            value: 'sick'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '874e03762ce64c14b4755b4f00cc3303'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'last_activity_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '87addf4e974545d8ad1960deb453c5e7'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'metric_type'
                            value: 'team_collaboration'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '87e948c068394ca293d0d1be8cc38d65'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '886fdd3df3644f5bacb97792a7887d4d'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'is_public'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '88c0e3f9a832408f914b75e90646bd09'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '88fd375eeee14f6398d98e4138ed7384'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'view_count'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '890a96e0c63844efaca9427738e40d71'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '893162df36d84014bb9106a19279a661'
                        key: {
                            sys_security_acl: '06ca34b39daa4ef7b0a0da5af378dbed'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '89520e4bfccc4fc78b9c13435f0bd46a'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'ergonomics'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '897d539ec6a0449785971b9de836ff1d'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'hire_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '89e008286f6845138a80cbb623237f53'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            value: 'team_event'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8a492b005f86463892bd535f27120201'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'status'
                            value: 'open'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8acf0ab8787748f0a55a0e4bd48fa452'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8adbff42d7fc411980a4cf6a0c6f20a4'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'recurrence_pattern'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8adc3fe7750946119204a0792d6775cb'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'department'
                            value: 'operations'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8c4c080ebaca49ea9ba3079cc8b78ccc'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'start_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8c5952bcfe874632af6ac3c6bbe587f6'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'end_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8c81e7d636ee48e6a78b94069fb249bc'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'external_url'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8cc4825ef1b74f68b5f424d73f6af2fc'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8d2647fe894344b1a55cb1e6e85ca375'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'start_time'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8d3d4f42fd1f480a8eae4ab717e972c2'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8d56f9218d5c4a6899766023436d4c89'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'status'
                            value: 'assigned'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8d8a36e1d30d465aac5637ea8f3851b3'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'expected_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '8d8f1ab3c15b4209814e0cff2802d9f8'
                        key: {
                            sys_ui_action: 'ad30fd19a2e348ccb8260e6105f285e5'
                            sys_user_role: {
                                id: '3984ef601e4f4df1847a5491434e3a2e'
                                key: {
                                    name: 'x_1599224_officehu.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8de4283b83694cdb81535e235891c891'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'original_schedule'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8e1629aec8794fbba5048cce146f2e26'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'fitness'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8e3d2c6fd70d4a73a25ee6a36684ed2e'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'metric_type'
                            value: 'overtime_hours'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8e53eb51b281400fbb3e25145ad525ac'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            value: 'running'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8e85b1c1794844f9a1fc3ed75d91f34d'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'expires_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8e8b17a740ed4c8f9543556e02f4af32'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'last_read_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8f02c9c0fb8c436dadbc67cc38def23f'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'priority'
                            value: 'urgent'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8f4ad6d9bba04a33a4c1911112618779'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8f53d217090b4435829a294f683843b8'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'billable'
                            value: 'billable'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8f8e681fd601483b832608e42b88997d'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'target_audience'
                            value: 'wellness_champions'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8ff604308271486a9ec1688338e25880'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'end_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9010123a9e2f454ea5a6e759152275ce'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            value: 'reminder'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '90a646f599d74e0b968c8fbccf38f086'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'work_location'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '90bdcd011a464fd38f6cea3b280509b2'
                        key: {
                            sys_security_acl: 'e21dcbdbf3c549c9999c212c5595bfc7'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '90c157a8bf754979bcb4e15bc9db28b3'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'work_location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '912f6dfb4ea84364a3f0906f3813f025'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'app_recommendation'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9172f362be164f0f9a0e9a5026138bb5'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '91b053d0a5514bb29c4d68e07daf3a1f'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'manager'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '923054f14c3f4a6facd463c102626b7b'
                        key: {
                            name: 'x_1599224_officehu.admin'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '929f21081e044a0d96053176b9fbb386'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'is_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '92ce51ca41eb463eb22c101d3c32017c'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'session_summary'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '93b4fcb53e80414088acdc30644755e6'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '93c18563b43f417c96b4ea8decbbfafb'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'goal_unit'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '93ef14dd920a47f78cf4cb86385360d0'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'reminder_sent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '93f86d8255d742a192f1082b7c7e3d7f'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'edited_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9418a6e73ad841b69168224942963393'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'activity_type'
                            value: 'steps'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '944c7e0e3fcd4b7c8abb4b76c931170a'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'sender_type'
                            value: 'human_agent'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9455d26058874ef69f858949f81e05cf'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'activity_type'
                            value: 'mixed_activities'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '94827bcb3ec64805b8d60fa10d4a8ab4'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'recurrence_pattern'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '94a8a792f1f242d895b800cac713fe25'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'satisfaction_rating'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '95006551b34a46d39e7193712d8aab12'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '958efc417a2944848bc8deab43610987'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '95f5d94952674cb5a4bebd9d5282e768'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'author'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9617ed83a896405baaa1bf034847d8c1'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '96b9fc0b6b7b4b718aa6cc181bc4838b'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'room_type'
                            value: 'direct_message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '97267a41b03d4a71abd9863aa20d41c8'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '976826f1a13f4847a7695676d28bed83'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'requester'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '97f481d7162b484cbcca3720e4a90288'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'processing_time_ms'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9854685333334cf0a882943ec3dffb6c'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'employee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '98621ab3e1de40e9a327626ef6b90ab5'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'related_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '986de1c3e1104b1a8cc1e7f0257606b1'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '98ec3c8cfe5d4966bfa00ffaefe88862'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'priority'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '98f78c1dd76e4f1b8f20ad7c91a70fd1'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'message_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '99576967b9274e6983f202ac19daaf91'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'total_activities'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '995fcaaae3c54a5e8abc79139952bf63'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'mentioned_users'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '99904e5d85724cdb99a8fc7d994359c7'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'chat_room'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '999861a2739d4002b1b472aed72f917e'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'goal_unit'
                            value: 'glasses'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9a9ebe3db00d47d5a01997715410cff2'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'status'
                            value: 'scheduled'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9af0a4452d0748ab921edbd318963a9a'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'previous_rank'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9b1e81aa18c04a0eaccd982e275c09ff'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'priority'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9b344202bdda47eab8a51b3bdba6da75'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_type'
                            value: 'team_building'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9bf142fc9cad485ea140ef5c2cb6e084'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'target_participants'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c1a6ce55e3947f986a48366a7ddeaf3'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9c4ff48a92d7446f8d3dc08b12435ab4'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c51db099574439297a37787026faaf0'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'end_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9c6fee170fd04b37b552a47743bf1c45'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'interaction_type'
                            value: 'share'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c78b7afad1a43859838d6a980d63f99'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'leaderboard_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9cbd41c96df64676ab971882cc7551c5'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'visibility'
                            value: 'public'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9cef69da73064eeb9a659a4853a4c084'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'shift_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9d209512fa2d48d09d813634d160871e'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d626807c40d4acfbf03ce46305d0a29'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'message_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9da2455ff01640ec95f6418307cccb9d'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9de1f9c74fa542bc91ec545270a522f4'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'expires_at'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9e4b44cb65cf4ba49bfe4bb50838483d'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9f04c5fd54b348fe81e6fd60c5293de1'
                        key: {
                            sys_security_acl: 'c3b2f3bbd93f4341b9c6c9500091e904'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f0ed3a0e91e48818b1462ab5e5db3fe'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'last_read_message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9f6852958dbf48e8afe8625e309c4c33'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'start_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9fe7157ee1c0495194475e950884d43c'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'difficulty_level'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a01b17b885d04ade8d8c46d3f4b2a5f9'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'billable'
                            value: 'non_billable'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a09adbf8f1f345b89c248d3ba4a26602'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a0a9adec1eb34e5f915e38933cae2121'
                        key: {
                            sys_security_acl: '22f5cd0c8ae24867b621ec23bd64042a'
                            sys_user_role: {
                                id: '923054f14c3f4a6facd463c102626b7b'
                                key: {
                                    name: 'x_1599224_officehu.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a0d2bbacb2d44bf1ad3cbb4519137296'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a0df3b7532b049939673fd91e9e57a03'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'work_location'
                            value: 'office'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a0e01960f8214d1785a148516c7a6250'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a0ee8bf9afe54dcfa36a4cfdce8f819e'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'related_table'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a0f0d1f3ad804457b426531315f2e353'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'end_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a0f19ef74b844df59819d8b74b7629c6'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'employee'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a1034bc08f0644999469633efe806be0'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_type'
                            value: 'fitness_challenge'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a1698187d12245ae8ff806534c6efe7e'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'target_value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a1cb713e2cd44417bd2727888ce992b2'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a2049c94978346b59f23e396c09d4a4b'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'period'
                            value: 'daily'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a227ac17f71a4e6cb72958a77abdef53'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'employee'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a2492afc67424a3c83aabe9e6895f1d5'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'shift_type'
                            value: 'weekend'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a25138340175499c94b3a72bcb154d00'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'is_recurring'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a3078f8d0e614a7fa5d1efd0eccf07a4'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'team_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a331e783ede94d5c8a9d597f37f191aa'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'approver'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a34176c51ba64877b4c843aa20cd7de7'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'status'
                            value: 'rejected'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a350ec27c5304b319341b806c9095813'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'message_content'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a35c12d58ab34669abb30a830c15a48e'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'priority'
                            value: 'medium'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a371c4cb3cca41d7ba0e88c0d8424384'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'metric_type'
                            value: 'punctuality_score'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: 'a390d99e7aeb42e5920b415f94785772'
                        key: {
                            sys_ui_action: '11651716616c4bcbae8a96d623f5201a'
                            sys_user_role: {
                                id: '3984ef601e4f4df1847a5491434e3a2e'
                                key: {
                                    name: 'x_1599224_officehu.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a3b64a078c6c4608941815077d75a00c'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'current_score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a3ffc61986f644fe8264e8d75d10b233'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'period'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a428216ebb8548d1a7c8fd7ad832293e'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a4f458eeed314aae95051713bd9fdb3d'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'action_url'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a50011f61fd04dccbe5420f1cec6d3da'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'status'
                            value: 'scheduled'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a5204f444cca476eacde2e0d34eefbe0'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'status'
                            value: 'expired'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a532f52472d048dbab87e152f596dd11'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'activity_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a5378712e09d41e28dc0a931cac21a66'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a53e8416af2542e09e582e7df01ffd6f'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'chat_room'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a5dc6978718244fda7fc3c4e0d871ce2'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'participation_status'
                            value: 'active'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a5e7fedfa77b43d2857d53e0931043d8'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'status'
                            value: 'draft'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a60d5b4b67504da18e7c5ab60742b0a9'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'preventive_care'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a61f5c364c2c4ac69677454331a4a453'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'priority'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a63f954e88aa4994b3111cbc820fccf8'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'days_active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a69c7fdc00b541f19dcc18153b8abda7'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'read_at'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a69f70f062c54433acef469eb67c73de'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'mindfulness'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a6c0346e0ae84114b584078fa9b858a5'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'level'
                            value: 'bronze'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a6c14c972906457d8a8f6e8eb9b204a1'
                        key: {
                            sys_security_acl: '652614982a4b44d3802f53e8c86a7214'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a7fee711871142f1bf76309b4cf2430d'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'progress_percentage'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a802f9de010f4a40a903133bd95c52ac'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'badge_earned'
                            value: 'silver'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a82fe67bc3eb46ada35cdc0428d9dbf5'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'message_type'
                            value: 'system_notification'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a8923609e893411bbfb1c0cd7ac490ad'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'compensation_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a8da2b502e884f75b22690c791262f82'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'device_source'
                            value: 'google_fit'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a941b5610bda4b6f9bafe1072212d711'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'last_updated'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a95f2536dc2f43f68da728ca26045b6a'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'work_life_balance'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a99082590db04372b671ab1f031193c7'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'activity_type'
                            value: 'meditation'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a9e007d1a97b4588a63d3092c6d2b712'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a9e03594e38146d6815989dae05243a7'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'progress_percentage'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aa03dbf6ef734206bc06d285c2288999'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'start_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'aa5578ead9d442f8b5f0aafd58f6d3ba'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'expert_tips'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aa6c949e840b4f4eb11df85fd074849d'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'bonus_points'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aa9ee023825c44eb931d0b1e9e833554'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'bonus_points'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aad5624939964f74b922b86be15821df'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'points_earned'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ab128e2bc4ae43de8a94d83ac6c36766'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'expires_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab1934588b2f4f00bdafeb021ae8a593'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'hire_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'abb37d6beef0419c8798909bd6b12301'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'view_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'abd2e4b0f74541e6832efeb1eb490b58'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'abe4b3497a7b41c1b8fb8946c77b70ec'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'role'
                            value: 'owner'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ac0660a9e0bc47a9b4d445681d7757c0'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'comment_text'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ac168596d64641c1b72c9df97e0e4899'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_status'
                            value: 'registration_closed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ac3f45a7d9ed4e859b25aae3981f8f09'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'internal_content'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ad14088f8bfb4326b9769f33531918b1'
                        key: {
                            sys_security_acl: 'fc0a2896d06a4ce086f3ae565c4dcada'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ad50b02baf8047d098d8592e89881f1d'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'adbfe63c2b594bdfb8b049cf99221db7'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'adfc64551efa45aaa70336fc7d7767f6'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'start_time'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ae1613f8eb3f451489cca31726d3384d'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aea6c2629c964a589a9be5aa16515b13'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'rank_position'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aee3059728bf4a02bda815e8a00f2b0a'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'is_team_leader'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'af0180051ccb42a9b9ad6855dc786223'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'chronic_conditions'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'af0e8b0b08b84f3ab84f1e261e69ba80'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'target_audience'
                            value: 'high_stress_roles'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'af3c46f9d93f43a2b2a0b9c5374bf312'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'message_type'
                            value: 'poll'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'af73a5e4890b445db54a54e8745dc71d'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'afd23c3c228c41ab8be772ab73e692ee'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'chat_session'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'afe0ab730cbb4c639689165e064fc42a'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b0484785edf2442497eb14fd84b0e622'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'priority'
                            value: 'normal'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b0f2187b810d4ded9414f8e05fccd47a'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'compensation_type'
                            value: 'bonus'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b1002f6475c14f38a4df33adec517142'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'participation_status'
                            value: 'inactive'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b1bc198c6a7b42318d5a1ff63c3327e7'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
                            value: 'paternity'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b1f568064e4446cc91e3dbb1e3f27342'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'current_score'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b1f5d12b1f0c4673aa36837430d6895a'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'last_activity'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b23ea23fb174494ba05da772893bb7c4'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'current_participants'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b2be5f1d1e2f44f6a942342574ec311e'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'read_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b31e2fb277da475daefec0955a900ce4'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'points'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b34a4d018ae54236af58d86fce88190d'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'end_time'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b356c517a4e84b9ab5d59d2200b6cc3e'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'goal_type'
                            value: 'personal'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b38b637f1eed4299a42984739f7c62af'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'role'
                            value: 'admin'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b3a142d910a04d189e491cc55fca7407'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            value: 'exercise'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b3aab356e7ba47369399139c830762eb'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b3c74e2cd215491a9ca1bcce03ae24b3'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b3d70ff4d23948558fd318e926de5fc1'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'duration_days'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'b4152fd17ff4425a8f704d4b06d21f48'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b42b3c77b2164d0c887fb092b1cc61be'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'mentioned_users'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b44e1abba7294f7a853b974a764fc3db'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'message_type'
                            value: 'announcement'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b48e7cf94a70423a834607b60401d853'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            value: 'deadline'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b4983c1be8a9443c863ddb88bdbc3e06'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b49e612c1ca1486392afa7919ab0adca'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'requires_approval'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b4f538dd0fd8496f8ef0a19f90bf9cdf'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'frequency'
                            value: 'daily'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b51e70ec240d42d18369cdfc5c98e61b'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'earned_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b53631cfbb5742228de89a2b4400b8f2'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'priority'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b570e63d57a64e86993351047d461a4e'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'badge_earned'
                            value: 'mvp'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b5e863fbd2164706bdaf035e652a7ece'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'sender_user'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b6336a64665b4223aff7021e59869de9'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'status'
                            value: 'escalated'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b6b80913d9834658a608a081352a7d37'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
                            value: 'bereavement'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b76421b1c6e44b0d9df63de95e81cb6b'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b7b0aba374de48509a19219412120a6c'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'employee_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b7dd06a8dc954871844648fa2fdcda04'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'status'
                            value: 'covered'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b80e366bf1664eeba3ce34fa47f83c76'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'days_requested'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b90283b030a1454db11d186fbcf1eb73'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'points'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b92a00b7f43f481c8a744cd5f4567cc1'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'parent_comment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b94c41332be14eb687f9679a98dcb370'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'start_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b9a0be0ccbc4445ebaa1936f413fdb6c'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'badge_earned'
                            value: 'champion'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b9affa420dab47058cea84effa6b867d'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'sender_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ba021bfd781243b1b932feed2da6bf33'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'visibility'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ba06137181e4483ea57baa9273e9b9b8'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba136d7fddfd44418c633e05edbd18be'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'duration_minutes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ba7f83e07ce64cdb8cfd8e488442299c'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'value'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bace9dca0f4d4aab8d0208b33b567675'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'activity_type'
                            value: 'water_intake'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bb2286a45a16436cb252c7f910d87a1d'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'hours'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bb8e9b4e8fb0442e843d2d495cdbaf4b'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            value: 'meditation'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bbe3141770784973b5ad18d167171ceb'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'team_wellness'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bc45e92589d14519959960aa4038952a'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'bc4d9e54b780487d9fd4361acd4fe22c'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bc7095f781184328a387509e1c772247'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'volunteer'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bca2c1eb51954c948c3af65cc79b97ad'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'category'
                            value: 'mental_health'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bcda99651ef343499f63345f94c4d56f'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'achievements_earned'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bd5cf1a60ac244a9b6a93c8a200b2cee'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'device_source'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'bda11adf8a4644a7a0fb61e9c2c7a537'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bdade05a7b3a48f7b91f6e2c6c8e19f3'
                        key: {
                            sys_security_acl: '671f2ff87e1a450e8ad58773e89d6473'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bdd938a26a474137851d30e0968e372d'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'internal_content'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'be4c8c935fc34fbaaac4a626479a137e'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            value: 'personal'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'be9df1495203421389924730672d38fa'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'device_source'
                            value: 'apple_watch'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bead1700ee2c4b17a0e93076b9864a1b'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'reminder_sent'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'bf1c32f78814425bb98c3cdd85a7032c'
                        key: {
                            sys_security_acl: 'e45bd651ac594100a9489e70e57ab50e'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bf316e2cc42c44ea97ba7cf5f402f866'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'current_progress'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bf5a7dac5a09433cafc0d745cda8736a'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c072c41ef6924c76adc173f8956b4532'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'level'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c0e15803489d44b19f9adad514887395'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c0e4d5db5373472eaffb807724630314'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c120eebb80064938909f074cd4d19ee1'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'sender'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c1725cc335ba4beea0d931d509bde37c'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'external_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c201edc89b444dd899ce2b93601eddbc'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c21e8aae7f83468299b869b3bc806c7a'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'max_members'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c2ca737428df496aa2e9312d520609a0'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_type'
                            value: 'trophy'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c343c6365d484fd98084497cf0970404'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c35778bc21f64505a56dd12fe24fd3aa'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'verified'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c35d6eb6da0c4e2285ae048a72556799'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'badge_earned'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c385089027c14693b9ccae179d723641'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c3f9b4b7aae84eeabf67213b7f9446d4'
                        key: {
                            sys_security_acl: '6d81ee237bcc47a7a1bd1b0944ff334a'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c43e57519b884af1ba2e97f9e837214c'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            value: 'training'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4d9b13e948b45278e75ac9ed9fdefdc'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c503992eae6f4ce1b7130234546585da'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c5799cf9ea9a46bfa835e31ebc8bc187'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_type'
                            value: 'weight_loss'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c63687169b4b4f9dae74d98d065c94ab'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            value: 'steps'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c661d35d901749ab914c90ae870562ad'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'mentioned_users'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c6fff14825f94aef9dba979e228e3576'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'interaction_type'
                            value: 'report'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c72ea57d51e848beabdcbc5151b04586'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c7a32997416d4bbe84d4da6a17865180'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'priority'
                            value: 'normal'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c7aea42dfa604eb796a3b46ba6843ef9'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            value: 'approval_request'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c7d386f5cca64bb9a4e2b03ff668d8a9'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'compensation_type'
                            value: 'none'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c8115f4b23974ebe9074e0e3a6c1bfb6'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'duration_days'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c84350cb2d404e33840baeac263ce167'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c87fac45867f44baa366c07d4af5668b'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'context_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c89555797d454afcb81e8a3fa6ff3a92'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'is_emergency'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c8d129d097b14f70bcb54c5d1828b07f'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'status'
                            value: 'paused'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c921f7119e96404eb52b7f95859ceeb7'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c92b726b13f44aa8b89d71d475e38e68'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c92be0225ad8417fa8fde51108da4bf3'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'shift_type'
                            value: 'overtime'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9e191d1b764458c8f486035fca8cd00'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c9f64f0bcc914aba8d462bc3c2908601'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9fd4f0a740c4b27a7faf9fe8ecded3a'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'interaction_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c9ff61ebc7084e2799035c7a32f096fc'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'notification_settings'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ca085bdd96c942b6b0d093683586b0d7'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'goal_unit'
                            value: 'pounds'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ca1d1d585d3f488091f06161e36580ef'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'project'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ca21148cbc7b4dfa9c4e00fdc25e131e'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'created_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ca88b437fd2a4640a77b9913d179100c'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'sender_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ca8af9de7d514dc6a520cda854e5036a'
                        key: {
                            sys_security_acl: '7a99ad64ebe64c6aa6c30b06d09754ed'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cacb4617bc474b12b028a302e17dec6d'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cade3af7f72b494099d01c47b052255c'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'status'
                            value: 'hidden'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'caf51af4cd4c4033ae4ff9b3682378fb'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'approved_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cba51a60c7ef4dc695d2118d63fd9977'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'last_message_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cbbc9e99df084e79a099ddf850de7511'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'status'
                            value: 'confirmed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cc4932ded6f7461db0e04f2fc48aec6a'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'max_team_size'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ccf3cbb62a17482c9348f998b23c9f3f'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'share_count'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd18637752fd4bf2942fef11bb4f6c78'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'cd368b7536424da5933332c917f309c9'
                        key: {
                            sys_security_acl: 'a994af28254644efb513083992f32ad1'
                            sys_user_role: {
                                id: '2b071810ba5b4d68a4f833dad02550b8'
                                key: {
                                    name: 'x_1599224_officehu.hr_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cd492598fa454c87984624b8d15e1a1a'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'ai_confidence'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cdca665b9c674c258965ce930ff1dcaf'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'work_location'
                            value: 'home'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ce1a37d0e957462ab4f81725399f04f7'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ce3669fb700a41cfb7e374f4dab1e7a7'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'earned_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ce6efd9c00554a7aab098703a26c30b7'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ce710ff2911b488b9001c9cb38fa008c'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_type'
                            value: 'recognition'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ceed02e8a36c44cea36faff9431e6a52'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'manager'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: 'cf01b84382674fa88f656a9be6e25748'
                        key: {
                            sys_ui_action: 'ad30fd19a2e348ccb8260e6105f285e5'
                            sys_user_role: {
                                id: '2b071810ba5b4d68a4f833dad02550b8'
                                key: {
                                    name: 'x_1599224_officehu.hr_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cf0c33c5904c4740933f48a5d3a925a6'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'current_participants'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cf88765a8238474abd7b1b0aa5f1a150'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'clock_in'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cff4b4e5453c4aa4b19f10b72cb4163e'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'achievement_type'
                            value: 'punctuality'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd03d7e8b58324a109e4bb949a7679b79'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'sender_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd07fa603c4944f91aad7d6328b174c1d'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'status'
                            value: 'approved'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd0beb50484ed4db5afeedd10d80ce0d2'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'action_data'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd109f640323d402698b806365f67cd48'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'share_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd1714900428945a8a0d95bdae7461bc7'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'created_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd18e8368da0a4683942b0fb212688cdf'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'participation_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd19b512644fa45b2bd69e41fc238412a'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'frequency'
                            value: 'quarterly'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd1c6e29010e94fdb9fd9afca9b53247a'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'employee_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd201256c6a954f6dbdc4ba59a2daa577'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd2131a65b591423dac6482124b26c91c'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'author'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd2804d3f1f424a72a66ca61b00199f28'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'challenge'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd29ba13ac95e4551baaacce19119bf7c'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'mentioned_users'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd307d986a1da460ba517ec4ac904f291'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'calculated_at'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd3450a61576b4f8989501f48f3f852fa'
                        key: {
                            sys_security_acl: 'b80228e9e26344888a001a0a12677497'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd35279fb3c6b4d24ad147dd20268ddc6'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'activity_type'
                            value: 'exercise'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd384a9d45c6e45fbb18122f82dc63e01'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'rules_and_guidelines'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd39144978b214764ba4eca1fd2fd8d63'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd3cc32b18630435e9af13fed665ff721'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'published_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd3cf216da3044afbae64933194258a4f'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'baseline_value'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd433ff45fc5d4013a47105ca3e3ebb36'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd542126c3555414f9c3416111dbbd030'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'joined_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd55848fc8be246ba9ee5b7d2bbabd28b'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'rating_average'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd5e0011586f84c20b7462a7ed60c4dcf'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'is_team_based'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5f3954279f9470a967ecae8d7970c30'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd65c8c188cd840d69320a56d44abf6b0'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'tags'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd671cdfe647240f2b7db48f2b1e2cf40'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'winner_announcement'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd6bdc9ca1911412bbb54f287fe4ad7a1'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'target_value'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'd6cc355ba1934ec2abae8bbbd94174a8'
                        key: {
                            logical_table_name: 'x_1599224_officehu_wellness_leaderboard'
                            col_name_string: 'participant,challenge'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd6d40bfa0c4144ff964d663f4a603a8c'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'end_date'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd704e40ba7c3400d84e0420360e6ebfd'
                        key: {
                            sys_security_acl: '2c8c523f6d43455c9fadd688cb1129a4'
                            sys_user_role: {
                                id: '923054f14c3f4a6facd463c102626b7b'
                                key: {
                                    name: 'x_1599224_officehu.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd71cd23fbb4443a98efdaa48ee955f00'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'is_public'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd74931f6ffd944b5ab495df63b47e136'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'sender'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd750332a61514bee9b7694a337cf7a2d'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'metric_type'
                            value: 'attendance_rate'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd7671cddd71342b4b769d1bc6055866f'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'achievement_type'
                            value: 'overtime_hero'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd7ab0c203f02477fafad14e0a8ba3b4b'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'interaction_type'
                            value: 'like'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd7db3f52f96a4b9e860c44dcd042c536'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'activity_type'
                            value: 'steps'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd7ee768f558c4e5ca9dda76e272f6112'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'work_location'
                            value: 'field'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd82d6d6c4b124c3680f5305e31c08468'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd8d166d786a746e7a8799482f1079123'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'last_activity_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd8f7b9bc441d4d9e9a82b9c1ae49ad12'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'target_audience'
                            value: 'new_employees'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd9b7e782315f4a7081ac9ed1b6d5ae35'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'joined_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd9d4bfff26af4135ac0837208805bb2f'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_title'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'da0258f44e0d4ed98a3d0080c3daf996'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'podcast'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'da0f2ee3ea654f04ae6485fd1fca13ba'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'da1cf76d84e34204bad266c19866d375'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'challenge'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'da43e3eee4b94daca59fab5e87ecbf26'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'post_type'
                            value: 'knowledge_share'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'db29eadeaa154539b17e37906065af93'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'message_type'
                            value: 'quick_reply'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'db31ae58498947ad84f1b2da14eaf5d5'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
                            value: 'personal'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dbf6dd6862624cfebafb796e70221c95'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'is_favorite'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dc94d5f868474c88976e400c0b9b9b8d'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'activity_type'
                            value: 'exercise_minutes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dcc1674aad434d4192aa0c197d000498'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'metric_type'
                            value: 'wellness_score'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dcce84e4dbdc46be8e7c0f00c878d9cf'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dcdd5dd48c584a5c82d757789d0bb28e'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dcea706c3316492da35341a2ca0ad916'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'department'
                            value: 'marketing'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dd15819e896349ebac8e452ff3fb1f56'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'urgency'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dd2b089357e8466ba3f461496c52d346'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'satisfaction_rating'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dd307a824c4f454ea21e4807d1a0adbb'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'team'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dd4260b2d8e54be1821d0fe59a4f9ab8'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'break_duration'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dd5267b2c81743a1bc9a9c8c624ce5a6'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_session'
                            element: 'session_summary'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ddb5602d1cd44cd0985d60042489fc7a'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ddcb089a1bc547cb9b43418813a3e9c3'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_status'
                            value: 'planning'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'de6fc7959d2d4ae9ae258534f4715864'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'allow_external_users'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'de7ee73b179d4e9b845fcb1ced12db54'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'sender_type'
                            value: 'user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'decabc7fe51845f1bb7c86550e83c407'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'metric_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'ded2c10738214a3c88d90f21e242aab0'
                        key: {
                            role: {
                                id: '3984ef601e4f4df1847a5491434e3a2e'
                                key: {
                                    name: 'x_1599224_officehu.manager'
                                }
                            }
                            contains: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'def1507c7f4341b483c3343435569277'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'approval_comments'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dfb17ba315c9424396d8f75433027402'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'published_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dff58215337a408fb7d113c7af6ac389'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'employee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e10fd7b8ab7e40b6bf05e1434c719d38'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'goal_type'
                            value: 'department'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e11b3ee93ebc44d4a695e2bbe768ad98'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'progress_percentage'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e156d5dcd32e4bf0aac83126f4ea5177'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'device_source'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e180c0ea08ac44f780bb7770b092e1c6'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'work_location'
                            value: 'hybrid'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e1991a65d86246dc8117e576c13a4bd7'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'start_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e19c3c82fcec437fb9a66fb475182ed5'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'role'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: 'e21d5180257f40159667efa58c5e8148'
                        key: {
                            sys_ui_action: '11651716616c4bcbae8a96d623f5201a'
                            sys_user_role: {
                                id: '2b071810ba5b4d68a4f833dad02550b8'
                                key: {
                                    name: 'x_1599224_officehu.hr_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e22b46959c574bd5941f0efc83c9163a'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'goal_description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e25cd3f87a8643d18a3d497e9d1402a5'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'is_company_wide'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e271c927e45c48c3aa64a5e38d9fa51d'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'message_type'
                            value: 'system'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e2c44d580a0a4844a1494c6d795d7dc3'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'work_location'
                            value: 'field'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e2da07e2d77445918eb6fadaea58c4c2'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'sender_type'
                            value: 'ai_assistant'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e2fbac8d67a24657ade8aada3161957e'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e3259915770044718aa610c32852174f'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e35c3cb18370448ab3e71a43e12ef334'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'visibility'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e3dafb3263dd4a7eaa976f79e251e8bd'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'work_location'
                            value: 'office'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e3e313c378f145e49d7f14fb36798b3a'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'message_type'
                            value: 'file_attachment'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e40a8deb019c477db39e2b8473c0d8b4'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'is_team_leader'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: 'e4297b5e8f424df489666c8919e54ae4'
                        key: {
                            sys_ui_action: 'edbdd27e95844e23a6f2f0dace26728b'
                            sys_user_role: {
                                id: '3984ef601e4f4df1847a5491434e3a2e'
                                key: {
                                    name: 'x_1599224_officehu.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e46c55498c674c7dbe413bed26e5d221'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'organizer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e4a682bfcdf14269be377fa84f90ca3c'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'is_archived'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e50b502320134942943827fe498061f2'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'status'
                            value: 'paused'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e5180282e6d546a591a8094d3f9f490f'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'last_message_preview'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e5797364a8fd4fe58ed58e2a5ce6e2a8'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e5b0eb372a0646e7ac75612b1d70be04'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'activity_type'
                            value: 'sleep'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e5f86bfeb04844fc83a2e25509315162'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_type'
                            value: 'mindfulness_challenge'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e678706c84374713965fb7caa8b5c2b1'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'goal_unit'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e68195a7919f4ced943e43e63d067bae'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'break_duration'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e6bdf2cbe0f04bd8bd7adf7d98af116f'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'start_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e762998679fe4f05b434a7e7b22e8a68'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'previous_rank'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e7c25345fe3c42989e8c7d96f432d553'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'scheduled_publish'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e7da740910d74b009917d507ac596cec'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'approval_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e7ef065993ea43b2ba633eb1e953f4ae'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e7f3f1f072b4441d957c0ec6654132a0'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            value: 'deadline_warning'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e86cbea54c044bc99ed80e70ea21c81e'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'action_data'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e8e6ad7dabfe4b92b3d0c885802c40c8'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'level'
                            value: 'silver'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e945a4a1c9ae4fd4a2ceebea9d2471d9'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'post'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e963db51396d465bb9a86890e78bc6b5'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e99fcbaea5564b168942751bc7210cc5'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'employee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e9ad5ab8506b4fb7b9ca8add429e71ad'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'status'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ea175774717941b7af155e6b06678640'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'eaca729a000c4ff0a6d279f8faca3f6a'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'shift_type'
                            value: 'regular'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'eaef0ad4e3214311a452d1a8835f82e9'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'status'
                            value: 'clocked_in'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'eb831ba635c944cc8ebd01f02ce4c143'
                        key: {
                            sys_security_acl: 'ad6dc36685164e6ebe581a12aa8f277e'
                            sys_user_role: {
                                id: '3984ef601e4f4df1847a5491434e3a2e'
                                key: {
                                    name: 'x_1599224_officehu.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ebb2b10b137c47cdb463b02898fd3667'
                        key: {
                            sys_security_acl: '00c2f761c42d45998b0b1d2cac81a292'
                            sys_user_role: {
                                id: '3984ef601e4f4df1847a5491434e3a2e'
                                key: {
                                    name: 'x_1599224_officehu.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ebf57b04bca146a1a5dd172c93d6ca52'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'end_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ec308b71ce0c4d9e9ab3415f7bfde793'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'job_title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ec89edf75624417a8e90b9ef9efb0115'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ecc5628f59444773a74ed55236affa75'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eccaceaefa8a4dc38e6425abb023c7e6'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ed109c0eec744813b5728d434bab0fcb'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'challenge_participation'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ed18d83c37514fe0a47a48a0998413fe'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'eda0062d77114a96842fd98badf70531'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'period'
                            value: 'monthly'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ee0997e7b5c74deebc4db2d42f26b470'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'checklist'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ee5cfc834d8949229c28b4bffec519f7'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'department'
                            value: 'finance'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ee769ba636cb44beaa3fbb45491b2821'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'message_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'eef3e7ee38af4e2489ab481079f8ad87'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'badge_earned'
                            value: 'none'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eefbd828b3c14d5f86d7c945a5f5a87d'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'sequence_number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ef4ad4c2e3b14828b816bc3f5e2f58e7'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'message_type'
                            value: 'image'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ef7ab763de294e3498dba4b528e60e23'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'priority'
                            value: 'medium'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ef8769900f264bb3bb3a8d028fb0cc54'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_type'
                            value: 'cycling'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'efac55ba7f3b4a77aaf40185a2dbf48c'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'post_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f078fa0686fc4cb0ac32e4035c841a4c'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'visibility'
                            value: 'team_only'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f0bc017b4d124790b2602b752e5591b9'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f0cd99913d1f45d2a1b24d185b9bf8ac'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'compensation_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f0e2fdbf525f4276af60e17fbed52575'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'device_source'
                            value: 'other'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f0fd2d84efe44c69a336b31365c028f4'
                        key: {
                            name: 'x_1599224_officehu_post_interaction'
                            element: 'post'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f104b06431e24e5f90d7c7150a5f1488'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'employee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f1af4f58fc204a159d3f064797d24f32'
                        key: {
                            sys_security_acl: 'c4c1362c3ba7459fa986a5493045cd72'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f1bb430cba3444469909cc78e7561fd3'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f1d6b83857ff42a082edf90120339618'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'status'
                            value: 'needs_coverage'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f1ff6b6e160443f3a14458aa1b365d1d'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'visibility'
                            value: 'department'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f20f8cfad97c48f6abfd656ed047b3af'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'status'
                            value: 'approved'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f222cdaf17274154aec2590ce1394f03'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'is_edited'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f27e1bee829b4c7486d505c63b6b8d27'
                        key: {
                            name: 'x_1599224_officehu_team_schedule'
                            element: 'is_recurring'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f28f3fcca1c04c1c9bfe5fa18594fb19'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'post_type'
                            value: 'question'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f3e85e9d70e14f65bce382a5b14095a8'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'challenge_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f449e8098ee346b08359971958365229'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'is_pinned'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f4e9f8ef5e2e47cc906babdcca27264e'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'notification_settings'
                            value: 'all'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f525af40e1b842aa8af23e08e88a9082'
                        key: {
                            name: 'x_1599224_officehu_coverage_request'
                            element: 'approved_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f59f8fd7676844d493743a9fdb86811f'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f6d629b2698c47e2928ad2966d6ac1d7'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'is_muted'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f6e5afce3dd24276ad1c529b52447cea'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            value: 'anniversary'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f6f95b762437418980d957aeec7fb526'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'is_team_based'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f6ff9579dfc743dfadd16b27baea2d18'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'message_content'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f77d0d9b66664cf1b17954c0d038230d'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f786ed70b7484fedb595f2ccafe7dcf8'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            value: 'alert'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f7dcecd3e44d46aba1345bb767455800'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'message_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f82c965b02134b0bb118d2aa2c8a8860'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f872694102314261a5dfeda06b021f19'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'f8d549f927af46faa0e2a566620dcea0'
                        key: {
                            role: {
                                id: '2b071810ba5b4d68a4f833dad02550b8'
                                key: {
                                    name: 'x_1599224_officehu.hr_admin'
                                }
                            }
                            contains: {
                                id: '3984ef601e4f4df1847a5491434e3a2e'
                                key: {
                                    name: 'x_1599224_officehu.manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f8db19b5c8514660b2c166d24c8265b5'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'badge_earned'
                            value: 'bronze'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f90ba473439d4afbb8d43dc47a434320'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'room_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f95e742d54b7421c9700a5cf018f6017'
                        key: {
                            name: 'x_1599224_officehu_event'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f9723807d74c441593faf4c2916b46cd'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'ai_confidence'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f97766a8d48145a6a1146831e249fb04'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'parent_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f99f6f7d2b1d42f9bf5f647b5fda04ac'
                        key: {
                            name: 'x_1599224_officehu_chat_room_member'
                            element: 'is_favorite'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f9b17e65db0c4614afc50774a7c91c35'
                        key: {
                            name: 'x_1599224_officehu_chat_room'
                            element: 'allow_external_users'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f9b3f9c3edc24a02a16efdad45f6a3b1'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'department'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f9f5594e75bb4183838ac9d0e70fa052'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fa622bb9f02d4b1493694889604907df'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'reward_type'
                            value: 'gift_card'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fb67cd0ef8ee4cc4bb8c59e3bf73369c'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'is_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fb9fd3d424864ad99dfa83bafcc9ad44'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'manager'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fc405c30670a4dd99fe9b6d06315aaf9'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'guide'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fc4306bcf89948d4998bf5de061ccb8c'
                        key: {
                            name: 'x_1599224_officehu_team_chat_message'
                            element: 'mentioned_users'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fccb44de1bc34fc79a500a591613c2a5'
                        key: {
                            name: 'x_1599224_officehu_social_post'
                            element: 'priority'
                            value: 'urgent'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fccf3d01e3ea4a2b9386594c4ba8f75f'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fce478d8981e447bb1e355c8f2fb272c'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fd02635bebe7461c8550e3253c2792c6'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'infographic'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fda6c81a4de047acb33a3efab840f517'
                        key: {
                            name: 'x_1599224_officehu_wellness_activity'
                            element: 'activity_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fdc4f9f7ed2e49418fc2dd5086f24668'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'employee'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fdd16f2516414b4b901cb7d85e47eec2'
                        key: {
                            name: 'x_1599224_officehu_wellness_leaderboard'
                            element: 'qualified_for_prize'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fde324b9a586460f93c56083f5e524e9'
                        key: {
                            sys_security_acl: 'aae22bbe10574145bf9409172b46ff7d'
                            sys_user_role: {
                                id: '58972d102e03459b81c289bd90b576ce'
                                key: {
                                    name: 'x_1599224_officehu.employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fe41657b4b41492aaef751403717c196'
                        key: {
                            name: 'x_1599224_officehu_ai_chat_message'
                            element: 'intent_detected'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fe4170411f2545d583399d17ef3472bc'
                        key: {
                            name: 'x_1599224_officehu_wellness_challenge'
                            element: 'goal_unit'
                            value: 'days'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fe70df56b34f4cb3adcd8f1e2fe688ce'
                        key: {
                            name: 'x_1599224_officehu_performance_metric'
                            element: 'calculated_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fef35184f5124d55b1d5469fc726cb3b'
                        key: {
                            name: 'x_1599224_officehu_wellness_resource'
                            element: 'resource_type'
                            value: 'template'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ff137c21fa104c6fb81e1aceb046f2d8'
                        key: {
                            name: 'x_1599224_officehu_wellness_goal'
                            element: 'activity_type'
                            value: 'weight_loss'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ff2fac5167be4bc7812f6324e55ca1bb'
                        key: {
                            name: 'x_1599224_officehu_notification'
                            element: 'notification_type'
                            value: 'leave_balance'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ff64a5a75f0345bc955839f6e0982f64'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'billable'
                            value: 'overtime'
                        }
                    },
                ]
            }
        }
    }
}
