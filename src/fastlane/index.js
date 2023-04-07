/*
 * @Author: JoyWT
 * @Date: 2023-04-04 10:30:49
 * @LastEditors: JoyWT
 * @LastEditTime: 2023-04-04 13:34:37
 * @Description: 
 * @version: 1.0
 */

/*如果你执行的子进程程序是需要处理压缩几百兆，甚至更大的文件的程序，时间较长，任务较重。那么推荐你使用spawn。此处需要你辨别，这个程序是否是node是执行主体。也就是说是否需要将文件完全读入node内存再进行处理。
接上一条。如果你只是想获取某个程序处理的结果。例如你执行某个shell脚本。让它去压缩，打包某一种文件，最终获取结果时。推荐使用exec，它会将shell脚本所有的输出整理最终统一返回。
如果你想要执行的是某个文件，建议使用execFile，它可以一定程度上加快执行的速度，减少系统资源的使用。
如果你想要在一个node程序中执行另一个node程序。并且还希望他们可以互相通信的话。fork是你最优的选择。*/

import {exec, spawn} from "child_process";
async function executeFastlane(command, path) {
  console.log('executeFastlane beginning')

  return new Promise((resolve, reject) => {
    exec(`cd ${path} && fastlane ${command}`, (error, stdout, stderr) => {
      if (error) {
        console.log('executeFastlaneerror')
        reject(`执行错误: ${error}`);
        return;
      }
      // console.log(stdout)
      // console.log(stderr)
      const lines = stdout.split("\n");
      const regex = /https:\/\/www\.pgyer\.com\/\w+/;
      let url;

      for (const line of lines) {
        if (line.includes("Visit this URL to see:")) {
          url = line.match(regex)[0];
          break;
        }
      }
      resolve(url);
    });
  });
}

async function spawnFastlane(command, stdoutCallback, stderrCallback, closeCallback, path) {
  return new Promise((resolve, reject) => {
    const child = spawn('fastlane', [command], { cwd: path });

    child.stdout.on('data', (data) => {
      stdoutCallback(data);
    });

    child.stderr.on('data', (data) => {
      stderrCallback(data);
    });

    child.on('close', (code) => {
      closeCallback(code);
      resolve(code);
    });
  });
}


export {
    executeFastlane,
    spawnFastlane
}
