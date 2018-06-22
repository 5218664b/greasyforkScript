> 脚本基于浏览器插件 [violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag?hl=zh-CN) 或者[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)运行，各浏览器插件安装地址[点我](https://greasyfork.org/zh-CN#home-step-1) 。
>
> 推荐使用violentmonkey,可以google driver同步，导入导出，搜索当前站点可用脚本。
>
> 以上插件可以把自定义的js脚本文件在合适的时机执行，通常是在页面完全加载完成之后。
>
> 此脚本是基于[微博视频下载助手](https://greasyfork.org/zh-CN/scripts/368211-%E5%BE%AE%E5%8D%9A%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B)修改的，因为微博网站改版，而作者没有更新脚本，原作者的脚本不能生效。
>
> 脚本执行原理分析：
>
> > 新浪微博站点主要的元素节点在js脚本中存放，动态加载，由于**$(document).ready();**的不确定性，我使用一个三秒的定时器，不断判断目标节点是否存在，若存在，在每条微博的点赞按钮后面添加一个**视频下载**的a节点按钮，并为此按钮绑定onclick事件，在点击时间发生后，在触发函数中通过**$(this)**获取到被点击按钮自身，分析网页中此按钮所在这条微博中video节点的相对位置，通过jquery选择器找到它，获取video节点的src属性(也就是视频的下载地址)，然后使用js创建一个download属性的a节点，触发其click事件就把视频下载下来了。
> >
> > 注意：
> >
> > > 1.新浪微博中视频video节点的src属性只在观看的时候才会有值
> > >
> > > 2.因为a标签dowload的浏览器兼容性，有的浏览器会直接打开mp4文件进行播放，把播放地址粘贴到其他下载器下载就可以了。