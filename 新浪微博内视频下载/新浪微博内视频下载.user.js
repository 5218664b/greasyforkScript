// ==UserScript==
// @icon            http://weibo.com/favicon.ico
// @name            新浪微博内视频下载
// @namespace       [url=mailto:1141802674@qq.com]1141802674@qq.com[/url]
// @author          MR Liu / fllow by 猎隼丶止戈
// @description     下载微博视频
// @match           *://weibo.com/*
// @require         http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @version         0.0.1
// @grant           GM_addStyle
// ==/UserScript==
(function() {
    'use strict';

    //与元数据块中的@grant值相对应，功能是生成一个style样式
    GM_addStyle('#down_video_btn{color:#fa7d3c;}');
    //设置定时器确保代码在视频元素加载完成后执行
    var clearInt = setInterval(mustProcess, 3000);
    function mustProcess() {
        //手动加载jquery
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//cdn.bootcss.com/jquery/1.8.3/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);

        //视频下载按钮的html代码
        var down_btn_html = '<li>';
        down_btn_html += '<a id="down_video_btn" class="S_txt2" title="视频下载">';
        down_btn_html += '<span class="pos">';
        down_btn_html += '<span class="line S_line1" node-type="comment_btn_text">';
        down_btn_html += '<span>';
        down_btn_html += '<em class="W_ficon ficon_video_v2 S_ficon">i</em>';
        down_btn_html += '<em>视频下载</em>';
        down_btn_html += '</span>';
        down_btn_html += '</span>';
        down_btn_html += '</span>';
        down_btn_html += ' <span class="arrow"><span class="W_arrow_bor W_arrow_bor_t"><i class="S_line1"></i><em class="S_bg1_br"></em></span></span>';
        down_btn_html += ' </li>';

        //将以上拼接的html代码插入到网页里的ul标签中
        var ul_tag = $("div.WB_handle>ul");
        
        //此处判断可以适当更改
        if (ul_tag.length != 0) {
            //停止定时器
            clearInterval(clearInt);
            
            ul_tag.removeClass("WB_row_r4").addClass("WB_row_r5").append(down_btn_html);
        }

        var videoTool = {
            //获取文件名
            getFileName: function(url, rule_start, rule_end) {
                var start = url.lastIndexOf(rule_start) + 1;
                var end = url.lastIndexOf(rule_end);
                return url.substring(start, end);
            },
            //弹出下载框
            download: function(videoUrl, name) {
                var content = "file content!";
                var data = new Blob([content], {
                    type: "text/plain;charset=UTF-8"
                });
                var downloadUrl = window.URL.createObjectURL(data);
                var anchor = document.createElement("a");
                anchor.href = videoUrl;
                anchor.download = name;
                anchor.click();
                window.URL.revokeObjectURL(data);
            }
        };
        
        //执行下载按钮的单击事件并调用下载函数
        $("a#down_video_btn").click(function() {
            var video = $(this).parents(".WB_feed_handle").last().prev().find("video");
            
            if (video) {
                var video_url = video.attr("src");
            }
          
            if (video_url) {
                //videoTool.download(video_url, videoTool.getFileName(video_url, "/", "?"));
                var name = videoTool.getFileName(video_url, "/", "?");
                var content = "file content!";
                var data = new Blob([content], {
                    type: "text/plain;charset=UTF-8"
                });
                var downloadUrl = window.URL.createObjectURL(data);
                var anchor = document.createElement("a");
                anchor.href = video_url;
                anchor.download = name;
                anchor.click();
                window.URL.revokeObjectURL(data);
            }
        });
    }
})();