!!This is a comment
*define BotToken as require('token.txt')
*define ProductKey as fakekeyhere 
!! Variable decliration must be before the use of the variable
!! Variables tend to go at the top of the file, although it does not matter

bot_token = *BotToken*
product_key = *ProductKey*


sql:
    host = 127.0.0.1
    user = root
    password = password
    database = qbv2
port = 3000
version_checker:
    console_log = no
    dm_app_owner = yes
modules: 
    moderation_commands = nill
    settings_system = nill
    utilities_general_system = nill
module_developer_settings:
    developer_mode = no
    debugDuplicates = no 
    duplicateOverrides = [newCase, none]
    duplicateTriggers = [guildLoop, none]
