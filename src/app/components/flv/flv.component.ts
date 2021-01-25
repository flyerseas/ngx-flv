import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import flvjs from 'flv.js'

@Component({
  selector: 'app-flv',
  templateUrl: './flv.component.html',
  styleUrls: ['./flv.component.css']
})
export class FlvComponent implements OnInit, OnDestroy {

  @ViewChild('video', { static: true }) videoEl;
  flvPlayer: any;
  httpSrc = '';

  constructor() {
    // this.httpSrc = 'http://1011.hlsplay.aodianyun.com/demo/game.flv';
    this.httpSrc = 'http://192.168.50.215:8080/live?app=hls&stream=physiograph-test'; // // 'http://192.168.50.215:8080/live?app=hls&stream=physiograph-test'; // 
    // this.httpSrc = 'http://192.168.1.101:1180/live?app=hls&stream=gj_camera';  //
  }

  ngOnDestroy(): void {
    if (this.flvPlayer) {
      this.flvPlayer.destroy();
    }
  }

  fullScreen() {
    var ele = this.videoEl.nativeElement;
    if (ele.requestFullscreen) {
        ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen();
    }
  }

  ngOnInit(): void {
    console.log(this.videoEl);
    this.initFlvVideoPlayer();
  }

  /**
 * @description flv视频播放
 */
  initFlvVideoPlayer() {
    if (this.httpSrc && flvjs.isSupported()) {
      if (this.flvPlayer) {
        this.flvPlayer.pause()
        this.flvPlayer.unload()
        this.flvPlayer.detachMediaElement()
        this.flvPlayer.destroy()
        this.flvPlayer = null
      }
      let videoElement = this.videoEl.nativeElement
      this.flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true, //直播模式
        hasAudio: false, //开启音频
        hasVideo: true,
        url: this.httpSrc,
      }, {
        enableWorker: true, //浏览器端开启flv.js的worker,多进程运行flv.js
        stashInitialSize: 128,
        enableStashBuffer: false, //播放flv时，设置是否启用播放缓存，只在直播起作用。
        autoCleanupSourceBuffer: true  //自动对sourceBuffer进行清理
      });

      this.flvPlayer.attachMediaElement(videoElement)
      this.flvPlayer.load()
      this.flvPlayer.play()


      this.flvPlayer.on(flvjs.Events.ERROR, (err) => {
        console.log('ERROR-------------------', err)
      })

      this.flvPlayer.on(flvjs.Events.LOADING_COMPLETE, (err) => {
        console.log('LOADING_COMPLETE-------------------', err)

        console.log('reconnect....');

        // this.flvVideoPlayer();

        if (this.flvPlayer) {

          setTimeout(() => {
            console.log('recnnect to...');


            //可行
            // this.initFlvVideoPlayer();

            //可行2
            this.flvPlayer.pause();
            // this.flvPlayer.unload();
            this.flvPlayer.load();
            // this.flvPlayer.play();
          }, 3000);

        }

      })

      this.flvPlayer.on(flvjs.Events.MEDIA_INFO, (err) => {
        console.log('MEDIA_INFO-------------------', err)
      })

      this.flvPlayer.on(flvjs.Events.RECOVERED_EARLY_EOF, (err) => {
        console.log('RECOVERED_EARLY_EOF-------------------', err)
      }) 

    }
  }

}
