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
                    bom_json: {
                        table: 'sys_module'
                        id: '35b8da18d32b4d71be4d75d31c61d1ea'
                    }
                    'calculate-attendance-hours': {
                        table: 'sys_script'
                        id: 'cf1203d3765d48a1805c8948ee6d29c9'
                    }
                    'officehub-main-page': {
                        table: 'sys_ui_page'
                        id: '60b654f37d914d2f80d36879da5d6ee4'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'a1ca81dffc51402695df393ca57e00e7'
                    }
                    'punctuality-checker': {
                        table: 'sys_script'
                        id: '2e716e8d7a7c4d76b6ef02d14959afc0'
                    }
                    'src_server_attendance-utils_js': {
                        table: 'sys_module'
                        id: 'cb97069e490844cd939b05abe5a436c0'
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
                        table: 'sys_documentation'
                        id: '025463c4fa134ec191862d3580209f1b'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'NULL'
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
                        id: '08613b8cff244c70935e9e76be0d6724'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'is_active'
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
                        table: 'sys_documentation'
                        id: '116457fada06411ebf1b3340e00c5b56'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'total_hours'
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
                        table: 'sys_choice'
                        id: '131e5cb8026b4141a98571cb7e833133'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'level'
                            value: 'gold'
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
                        id: '16e5d3d01c4c42b580fad7dda790a68c'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'department'
                            value: 'sales'
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
                        id: '1bdc1327f1f343ae83f39596ef1896e9'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'billable'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: '1eab5e26c7ee444482ba152dc705bea4'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'user'
                            language: 'en'
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
                        table: 'sys_db_object'
                        id: '1f3d0295bcd94f40b1bff2681d3ace54'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
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
                        table: 'sys_dictionary'
                        id: '24f49e62b4e44f60a7b9970ac1aef35e'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'billable'
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
                        table: 'sys_choice'
                        id: '290da8bf83e2490b98858fbb2c87ffec'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'level'
                            value: 'platinum'
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
                        table: 'sys_choice'
                        id: '2ddd42058c504791a61ef536f7871a08'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'status'
                            value: 'submitted'
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
                        table: 'sys_dictionary'
                        id: '35935fd18aef4cdc8ff675c507e6b207'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'status'
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
                        table: 'sys_dictionary'
                        id: '3a0fd45e9ab347ec9f90c9bf353f55da'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'date'
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
                        table: 'sys_choice'
                        id: '44c7de0c19d24de4bcd7178d7e62ae32'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'status'
                            value: 'clocked_out'
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
                        table: 'sys_choice'
                        id: '4ac1087194a343a0b5f5d799a379504d'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'achievement_type'
                            value: 'perfect_attendance'
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
                        table: 'ua_table_licensing_config'
                        id: '5183e87a49654fd4ab8cb54bfb48fbd6'
                        key: {
                            name: 'x_1599224_officehu_event'
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
                        id: '525f9676c1594205b0de65aa12a7dd78'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'hours'
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
                        table: 'sys_choice'
                        id: '5626160e9a364f8bb9d3565c98916095'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'work_location'
                            value: 'home'
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
                        table: 'sys_user_role'
                        id: '58972d102e03459b81c289bd90b576ce'
                        key: {
                            name: 'x_1599224_officehu.employee'
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
                        table: 'sys_documentation'
                        id: '5be3873450cb46c999f9e9a1673a0f99'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'organizer'
                            language: 'en'
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
                        id: '5e7efe9188e3484ba426d32a3c83624e'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'employee'
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
                        table: 'sys_db_object'
                        id: '623ea557cfaa445480a207b2a30718ce'
                        key: {
                            name: 'x_1599224_officehu_attendance'
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
                        table: 'sys_dictionary'
                        id: '67a3f3cbfbee4c9a85126690e85aad14'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'description'
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
                        table: 'sys_dictionary'
                        id: '6a1bbe40fd224ed198da47300615bbae'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'days_requested'
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
                        table: 'sys_documentation'
                        id: '6bada60373ca417a87506b680eaa8b59'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'description'
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
                        table: 'sys_choice'
                        id: '6fb75b52133f40e6b5e6e19c3be60a70'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            value: 'holiday'
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
                        table: 'sys_choice'
                        id: '73424230418f45f8ae1e2e4ba9024db4'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'status'
                            value: 'cancelled'
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
                        table: 'sys_documentation'
                        id: '78e6ae47825b45259a2b6334028e6b2b'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'start_date'
                            language: 'en'
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
                        table: 'sys_dictionary'
                        id: '82ac3224983a4b31a1458e89e2c73510'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'work_location'
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
                        id: '873ed91e5c6a46038826f17c2e487c97'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
                            value: 'sick'
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
                        id: '8cc4825ef1b74f68b5f424d73f6af2fc'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'title'
                            language: 'en'
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
                        table: 'sys_dictionary'
                        id: '90a646f599d74e0b968c8fbccf38f086'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'work_location'
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
                        id: '93ef14dd920a47f78cf4cb86385360d0'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'reminder_sent'
                            language: 'en'
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
                        table: 'sys_dictionary'
                        id: '9c1a6ce55e3947f986a48366a7ddeaf3'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'user'
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
                        table: 'sys_dictionary'
                        id: 'a0f19ef74b844df59819d8b74b7629c6'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'employee'
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
                        table: 'sys_dictionary'
                        id: 'a227ac17f71a4e6cb72958a77abdef53'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'employee'
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
                        table: 'sys_dictionary'
                        id: 'a5378712e09d41e28dc0a931cac21a66'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'reason'
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
                        id: 'a6c0346e0ae84114b584078fa9b858a5'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'level'
                            value: 'bronze'
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
                        id: 'aa03dbf6ef734206bc06d285c2288999'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'start_date'
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
                        table: 'sys_dictionary'
                        id: 'abd2e4b0f74541e6832efeb1eb490b58'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'leave_type'
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
                        id: 'b31e2fb277da475daefec0955a900ce4'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'points'
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
                        table: 'sys_choice'
                        id: 'b48e7cf94a70423a834607b60401d853'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            value: 'deadline'
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
                        table: 'sys_dictionary'
                        id: 'bb2286a45a16436cb252c7f910d87a1d'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'hours'
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
                        table: 'sys_choice'
                        id: 'be4c8c935fc34fbaaac4a626479a137e'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'event_type'
                            value: 'personal'
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
                        table: 'sys_dictionary'
                        id: 'c343c6365d484fd98084497cf0970404'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'user'
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
                        table: 'ua_table_licensing_config'
                        id: 'c72ea57d51e848beabdcbc5151b04586'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
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
                        table: 'sys_documentation'
                        id: 'c89555797d454afcb81e8a3fa6ff3a92'
                        key: {
                            name: 'x_1599224_officehu_leave_request'
                            element: 'is_emergency'
                            language: 'en'
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
                        id: 'ca1d1d585d3f488091f06161e36580ef'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'project'
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
                        id: 'cdca665b9c674c258965ce930ff1dcaf'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'work_location'
                            value: 'home'
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
                        table: 'sys_choice'
                        id: 'd07fa603c4944f91aad7d6328b174c1d'
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'status'
                            value: 'approved'
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
                        id: 'd6d40bfa0c4144ff964d663f4a603a8c'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'end_date'
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
                        id: 'd7ee768f558c4e5ca9dda76e272f6112'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_employee'
                            element: 'work_location'
                            value: 'field'
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
                        table: 'sys_dictionary'
                        id: 'dd4260b2d8e54be1821d0fe59a4f9ab8'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'break_duration'
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
                        id: 'e180c0ea08ac44f780bb7770b092e1c6'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'work_location'
                            value: 'hybrid'
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
                        id: 'e2c44d580a0a4844a1494c6d795d7dc3'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'work_location'
                            value: 'field'
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
                        table: 'sys_dictionary'
                        id: 'e46c55498c674c7dbe413bed26e5d221'
                        key: {
                            name: 'x_1599224_officehu_event'
                            element: 'organizer'
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
                        id: 'e8e6ad7dabfe4b92b3d0c885802c40c8'
                        key: {
                            name: 'x_1599224_officehu_achievement'
                            element: 'level'
                            value: 'silver'
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
                        id: 'eaef0ad4e3214311a452d1a8835f82e9'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'status'
                            value: 'clocked_in'
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
                        id: 'f104b06431e24e5f90d7c7150a5f1488'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_timesheet'
                            element: 'employee'
                            language: 'en'
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
                        id: 'f77d0d9b66664cf1b17954c0d038230d'
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'notes'
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
                        table: 'sys_db_object'
                        id: 'f95e742d54b7421c9700a5cf018f6017'
                        key: {
                            name: 'x_1599224_officehu_event'
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
                        id: 'fdc4f9f7ed2e49418fc2dd5086f24668'
                        deleted: true
                        key: {
                            name: 'x_1599224_officehu_attendance'
                            element: 'employee'
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
