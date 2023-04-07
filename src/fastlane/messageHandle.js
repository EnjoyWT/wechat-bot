/*
 * @Author: JoyWT
 * @Date: 2023-04-04 11:50:14
 * @LastEditors: JoyWT
 * @LastEditTime: 2023-04-04 15:53:10
 * @Description: 
 * @version: 1.0
 */

// $:安心嗨,1,udid
let appMap = {
    "安心嗨":" /Users/tz/Desktop/s/Jitterbug",
    "Tt":"/Users/tz/Desktop/Tt"
}
let cmdMap = ["build","resign"]
 function formateMessage(msg) {

    if (msg.trim()!=="" && msg.startsWith('$:')) {

        var trimStr = msg.trim()
        var infos = trimStr.split(",")
        if (infos.length < 3) {
            return {cmd:null, path:null}
        }
        var appName = infos[0].split(":")[1]
        if (Object.keys(appMap).findIndex((item,index) => {
            return item == appName
            }) == -1){
            return {cmd:null, path:null}
        }
        var path = appMap[appName]
        var cmd = infos[1]
        var cmdStr = null
        if (cmd == 1 || cmd == "1") {
            cmdStr = "resign_lane"
        }else if (cmd == 0 || cmd == "0"){
            cmdStr = "build_lane"
        }
        var udid = infos[2]
        var cmdStrEnd = null
        if (udid.length > 10) {
            cmdStrEnd = `${cmdStr} device_udid:${udid}`
        }else{
            cmdStrEnd = `${cmdStr}`
        }
        console.log(cmdStrEnd)

        return {cmd:cmdStrEnd, path:path}
    }

    return {cmd:null, path:null}
}
export {
    formateMessage
}