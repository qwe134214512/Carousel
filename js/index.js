(function($) {
    var CarOusel = function(elem) {
        var _self = this;
        //保存单一实例
        this.elem = elem;
        this.calItemMain = elem.find('ul.cal-list');
        this.nextBtn = elem.find('div.cal-btn-right');
        this.preBtn = elem.find('div.cal-btn-left');


        this.calNums = elem.find('li.cal-item');
        this.calFirstItem = this.calNums.first();
        this.calLastItem = this.calNums.last();

        //默认配置参数
        this.setting = {
            width: 1000,
            height: 270,
            calWidth: 640,
            calHeight: 270,
            scale: 0.9,
            verticalAlign: 'middle',
            speed: 300
        };

        $.extend(this.setting, this.getString());
        console.log(this.calNums.length);

        this.setSettingValue();
        this.setOtherPos();

        this.nextBtn.click(function(event) {
            _self.carouselRotate("left");
        });
        this.preBtn.click(function(event) {
            _self.carouselRotate("right");
        });

        // window.setInterval(function(){
        //     _self.nextBtn.triggerHandler('click');
        // },1000);
    }

    CarOusel.prototype = {
        carouselRotate: function(dir) {
            var _this = this;

            if (dir == "left") {
                this.calNums.each(function(index, el) {
                    var prev = $(this).prev().get(0) ? $(this).prev() : _this.calLastItem,
                        width = prev.width(),
                        height = prev.height(),
                        zIndex = prev.css("zIndex"),
                        opacity = prev.css("opacity"),
                        left = prev.css("left"),
                        top = prev.css("top");

                    if (!$(this).is(":animated")) {
                        $(this).animate({
                            width: width,
                            height: height,
                            zIndex: zIndex,
                            opacity: opacity,
                            left: left,
                            top: top
                        });
                    }
                });
            } else if (dir == "right") {
                this.calNums.each(function(index, el) {
                    var next = $(this).next().get(0) ? $(this).next() : _this.calFirstItem,
                        width = next.width(),
                        height = next.height(),
                        zIndex = next.css("zIndex"),
                        opacity = next.css("opacity"),
                        left = next.css("left"),
                        top = next.css("top");

                    if (!$(this).is(":animated")) {
                        $(this).animate({
                            width: width,
                            height: height,
                            zIndex: zIndex,
                            opacity: opacity,
                            left: left,
                            top: top
                        });
                    }
                });
            }
        },

        //设置其他帧图片的位置
        setOtherPos: function() {
            var _self = this;

            var others = this.calNums.slice(1),
                otherSize = Math.ceil(others.length / 2),
                rightSlice = others.slice(0, otherSize),
                leftSlice = others.slice(otherSize);

            var rw = this.setting.calWidth,
                rh = this.setting.calHeight,
                gap = ((this.setting.width - rw) / 2) / otherSize;

            rightSlice.each(function(index, el) {
                otherSize--;
                rw = rw * _self.setting.scale;
                rh = rh * _self.setting.scale;

                $(this).css({
                    zIndex: otherSize,
                    width: rw,
                    height: rh,
                    opacity: 1 / (++index),
                    right: gap * otherSize,
                    top: _self.setVerticalAlign(rh)
                })
            });

            var lw = rightSlice.last().width();
            lh = rightSlice.last().height();

            oloop = Math.floor(others.length / 2);
            leftgap = ((this.setting.width - this.setting.calWidth) / 2) / oloop;

            var i = 1;
            leftSlice.each(function(index, el) {
                $(this).css({
                    zIndex: index,
                    width: lw,
                    height: lh,
                    opacity: 1 / oloop,
                    left: leftgap * index,
                    top: _self.setVerticalAlign(lh)
                });
                lw = lw / _self.setting.scale;
                lh = lh / _self.setting.scale;
                oloop--;
            });
        },

        //设置垂直排列对齐
        setVerticalAlign: function(height) {
            var laginType = this.setting.verticalAlign;
            var top;
            switch (laginType) {
                case "middle":
                    top = (this.setting.height - height) / 2;
                    break;
                case "top":
                    top = 0;
                    break;

                case "bottom":
                    top = this.setting.height - height;
                    break;
            }
            return top;
        },

        //设置配置参数控制基本宽高
        setSettingValue: function() {
            this.elem.css({
                width: this.setting.width,
                height: this.setting.height
            });
            this.calItemMain.css({
                width: this.setting.width,
                height: this.setting.height
            })
            //计算上下切换按钮的宽度
            var w = (this.setting.width - this.setting.calWidth) / 2;

            this.nextBtn.css({
                width: w,
                height: this.setting.height,
                zIndex: Math.ceil(this.calNums.length / 2)
            });
            this.preBtn.css({
                width: w,
                height: this.setting.height,
                zIndex: Math.ceil(this.calNums.length / 2)
            });
            this.calFirstItem.css({
                width: this.setting.calWidth,
                height: this.setting.calHeight,
                left: w,
                zIndex: Math.floor(this.calNums.length / 2)
            })
        },

        //获取人工配置参数
        getString: function() {
            var setting = this.elem.attr('data-setting');
            if (setting && setting != "") {
                return $.parseJSON(setting);
            } else {
                return {};
            }
        }
    };

    CarOusel.init = function(cal) {
        var _this = this;
        cal.each(function(index, el) {
            new _this($(this));
        });
    }

    window["CarOusel"] = CarOusel;
})(jQuery)