var sketch=angular.module("sketch",[]);
    sketch.controller('sketchcontroller', ['$scope', function($scope){
    	$scope.cketchWH={width:1000,height:600};
    	var canvas=document.querySelector('#canvas');
    	var ctx=canvas.getContext('2d');
    	var current;
        $scope.tool='rect';
        $scope.tools={
            '画笔':'pen',
            '直线':'line',
            '圆':'arc',
            '矩形':'rect',
            '橡皮':'erase'
        }
        $scope.cssStyle={
            fillstyle:'#000000',
            strokestyle:'#000000',
            style:'stroke',
            lineWidth:1
        }
        $scope.setTool=function(ev){
            $scope.tool=ev;
        }
        $scope.setStyle=function(ev){
            $scope.cssStyle.style=ev;
        }
        $scope.newcanvas=function(){
            if(current){
                if(confirm("是否保存")){
                    location.href=canvas.toDataURL();
                    location.download = 'mypic.png';
                }
            }
            clearCanvas();
            current = null;
        }
        $scope.download=function(){
            if(current){
                ev.srcElement.href=canvas.toDataURL();
                ev.srcElement.download = 'mypic.png';
            }else{
                alert('空画布');
            }
        }
        $scope.xiankuan=[1,3,5,7,9,11,13,15];//线宽值；
        //画图函数
        var clearCanvas=function(){
            ctx.clearRect(0,0,$scope.cketchWH.width,$scope.cketchWH.height)
        }
        var setmouseover={
            arc:function(e){
                canvas.onmousemove=function(ev){
                    clearCanvas();
                    if(current){
                        ctx.putImageData(current,0,0)
                    }
                    ctx.beginPath();
                    ctx.arc(e.offsetX,e.offsetY,Math.abs(e.offsetX-ev.offsetX),0,Math.PI*2);
                    if($scope.cssStyle.style=='fill'){
                        ctx.fill();
                        console.log(1)
                    }else{
                        ctx.stroke();
                        console.log(2)
                    }
                    
                }
            },
            line:function(e){
                canvas.onmousemove=function(ev){
                    clearCanvas();
                    if(current){
                        ctx.putImageData(current,0,0)
                    }
                    ctx.beginPath();
                    ctx.moveTo(e.offsetX,e.offsetY);
                    ctx.lineTo(ev.offsetX,ev.offsetY);
                    ctx.stroke();
                }
            },
            pen:function(e){
                ctx.beginPath();
                ctx.moveTo(e.offsetX,e.offsetY);
                canvas.onmousemove=function(ev){
                    clearCanvas();
                    if(current){
                        ctx.putImageData(current,0,0)
                    }
                    ctx.lineTo(ev.offsetX,ev.offsetY);
                    ctx.stroke();
                }
            },
            rect:function(e){
                canvas.onmousemove=function(ev){
                    clearCanvas();
                    if(current){
                        ctx.putImageData(current,0,0);
                    }
                    ctx.beginPath();
                    
                     if($scope.cssStyle.style=='fill'){
                        ctx.fillRect(e.offsetX,e.offsetY,ev.offsetX-e.offsetX,ev.offsetY-e.offsetY);
                    }else{
                        ctx.strokeRect(e.offsetX-0.5,e.offsetY-0.5,ev.offsetX-e.offsetX,ev.offsetY-e.offsetY);
                    }
                }
            },
            erase:function(e){
                canvas.onmousemove=function(ev){
                    ctx.clearRect(ev.offsetX-20,ev.offsetY-20,40,40);
                }
            }

        }
    	canvas.onmousedown=function(e){
            ctx.fillStyle=$scope.cssStyle.fillstyle;
            ctx.strokeStyle=$scope.cssStyle.strokestyle;
            ctx.lineWidth=$scope.cssStyle.lineWidth;
    		setmouseover[$scope.tool](e);
    		document.onmouseup=function(){
    			canvas.onmousemove = null;
    			canvas.onmouseup = null;
    			current = ctx.getImageData(0,0,$scope.cketchWH.width,$scope.cketchWH.height)
    		}
            
    	}
    }]) 

    // getImageData(x,y,w,h)
    // putImageData(el,x,y)