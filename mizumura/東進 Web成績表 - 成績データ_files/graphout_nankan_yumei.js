  	let baseColor = "#000";
   	let dashLineColor = "#808080";
   	let barFillColor = "#e4ae53";
   	let CLineColor = "#6cc067";
   	let StudentResultColor = "#2661a8";

   	var PI = 3.1415926535897;

  	function makeStar(s,dX,dY,dR1,dR2,iRCount) {
  		var dPi = 3.1415926535897;
  		var array = [];
  		for( let i=0; i<iRCount*2;i++)
  		{
  			var dTmpX = dX + (i % 2 == 0 ? dR1 : dR2) * Math.cos(2*dPi*i/(iRCount*2) - dPi/2);
  			var dTmpY = dY + (i % 2 == 0 ? dR1 : dR2) * Math.sin(2*dPi*i/(iRCount*2) - dPi/2);
  			array.push(dTmpX+","+dTmpY+" ");
  		}
  		var tmpPath = array.join(",");
  		s.polygon({points:[tmpPath],
  			fill:"#2661a8",strokeWidth:0});
  	}


    //大問別得点率
  	function PrintOutputKyoukaDaimonChart(dX,dY,Daimon,StudentResult,CLine)
  	{
  		let s = Snap("#svgKyoukaDaimonChart");
  		let iMaxPoint = 100;

  		let dCenterX = dX + 240;
  		let dCenterY = dY + 190;
  		let dGraphR = 150;

      //凡例
      if(true)
      {
        //あなたの得点率の凡例
        s.line(330,10,360,10)
        .attr({
          fill: 'none',
          stroke: StudentResultColor,
          strokeWidth: 3
        });
        s.text(365,10,"あなたの得点率")
        .attr({
          fontSize:"14px",
          fill: "#000",
          textAnchor:"start",
          dominantBaseline:"middle"
        });
        //Cライン得点率の凡例
        s.line(330,28,360,28)
        .attr({
          fill: 'none',
          stroke: CLineColor,
          strokeWidth: 4
        });
        s.text(365,30,"Cライン得点率")
        .attr({
          fontSize:"14px",
          fill: "#000",
          textAnchor:"start",
          dominantBaseline:"middle"
        });
      }

  		//枠の作成(得点率ごとの線)
  		for (let iRate=20;iRate<=iMaxPoint;iRate+=20)
  		{
  			var ChartXY=[];	
  			for(let i=0;i<Daimon.length;i++)
  			{
  				var dTmpX = dCenterX + dGraphR * iRate / iMaxPoint * Math.cos(2*PI*i/Daimon.length - PI/2);
  				var dTmpY = dCenterY + dGraphR * iRate / iMaxPoint * Math.sin(2*PI*i/Daimon.length - PI/2);
  				ChartXY.push(dTmpX+","+dTmpY+"");
  			}
  			var tmpPath = ChartXY.join(",");
  			s.polygon({points:[tmpPath],
  					  fill: 'none',
  			  stroke: dashLineColor,
  			  strokeWidth: 1});
  		}

  		//枠の作成(中心から放射状の線)
  		if (true)
  		{
  			for (let i=0;i<Daimon.length;i++)
  			{
  				//グラフの線を引く
  				var dTmpX = dCenterX + dGraphR * Math.cos(2*PI*i/Daimon.length - PI/2);
  				var dTmpY = dCenterY + dGraphR * Math.sin(2*PI*i/Daimon.length - PI/2);
  				s.line(dCenterX,dCenterY,dTmpX,dTmpY)
  						.attr({
  						  fill: 'none',
  						  stroke: dashLineColor,
  						  strokeWidth: 1
  						});
  			}
  		}

  		if (Daimon.length == 2)
  		{
  			s.line(dCenterX-dGraphR,dCenterY,dCenterX-dGraphR+dGraphR*2,dCenterY)
  					.attr({
  					  fill: 'none',
  					  stroke: dashLineColor,
  					  strokeWidth: 1
  					});
  		}

  		//得点率の出力
  		for (let iRate=0;iRate<=iMaxPoint;iRate+=20)
  		{
  			s.text(dCenterX-10,dCenterY-dGraphR*iRate/iMaxPoint+5,iRate+"%")
  			.attr({
  				fontSize:"16px",
  				fill: dashLineColor,
  				textAnchor:"end",
  				dominantBaseline:""
  			});
  		}

  		//Cライン得点
  		if(CLine.length>0)
  		{
  			var ChartXY=[];	
  			for(let i=0;i<Daimon.length;i++)
  			{
  				var dTmpX = dCenterX + dGraphR * CLine[i] / iMaxPoint * Math.cos(2*PI*i/Daimon.length - PI/2);
  				var dTmpY = dCenterY + dGraphR * CLine[i] / iMaxPoint * Math.sin(2*PI*i/Daimon.length - PI/2);
  				ChartXY.push(dTmpX+","+dTmpY+"");
  				s.rect(dTmpX-15/2,dTmpY-15/2,15,15)
  				.attr({fill:CLineColor});
  			}
  			var tmpPath = ChartXY.join(",");
  			s.polygon({points:[tmpPath],
  					  fill: 'none',
  					  stroke:CLineColor ,
  					  strokeWidth: 6});
  		}

  		//あなたの得点(グラフ)
  		if (StudentResult.length>0)
  		{
  			var ChartXY=[];	
  			for(let i=0;i<Daimon.length;i++)
  			{
  				var dTmpX = dCenterX + dGraphR * StudentResult[i] / iMaxPoint * Math.cos(2*PI*i/Daimon.length - PI/2);
  				var dTmpY = dCenterY + dGraphR * StudentResult[i] / iMaxPoint * Math.sin(2*PI*i/Daimon.length - PI/2);
  				ChartXY.push(dTmpX+","+dTmpY+"");
  				s.rect(dTmpX-12/2,dTmpY-12/2,12,12)
  				.attr({fill:StudentResultColor});
  			}
  			var tmpPath = ChartXY.join(",");
  			s.polygon({points:[tmpPath],
  					  fill: 'none',
  					  stroke:StudentResultColor ,
  					  strokeWidth: 3});
  		}

  		//あなたの得点(数値)
  		if (StudentResult.length>0)
  		{
        var ChartXY=[];
        let dBeforeTmpX = [];
        let dBeforeTmpY = [];
        for (let i=0;i<Daimon.length;i++)
        {
          let dTmpRate = StudentResult[i];

          let dGraphRate = dTmpRate;
          if (dGraphRate < 20)
          {
            dGraphRate += 10;
          }

          var dTmpX = dCenterX + dGraphR * (dGraphRate+3) / iMaxPoint * Math.cos(2*PI*i/Daimon.length - PI/2 + PI/30);
          var dTmpY = dCenterY + dGraphR * (dGraphRate+3) / iMaxPoint * Math.sin(2*PI*i/Daimon.length - PI/2 + PI/30);
          if (i/Daimon.length < 0.5)
            dTmpX += 45;
          else
            dTmpX -= 45;

          if(dBeforeTmpX.length > 0)
          {
            for(let p=0; p<dBeforeTmpX.length; p++)
            {
              if(Math.abs(dTmpX-dBeforeTmpX[p]) < 10 && Math.abs(dTmpY-dBeforeTmpY[p]) < 10)
              {
                dTmpX +=20;
                dTmpY +=20;
              }
            }
          }

          dBeforeTmpX.push(dTmpX);
          dBeforeTmpY.push(dTmpY);

          ChartXY.push(dTmpX+","+dTmpY+"");
          //テキスト出力
          s.text(dTmpX- 2.5,dTmpY -2.5,StudentResult[i]+"%")
          .attr({
            fontSize:"16px",
            fill: StudentResultColor,
            textAnchor:"middle",
            dominantBaseline:""
          });
        }
  		}

  		if (true)
  		{
  			//大問名称を出力
  			var ChartXY=[];
  			for (let i=0;i<Daimon.length;i++)
  			{
    				var dTmpX = dCenterX + dGraphR * Math.cos(2*PI*i/Daimon.length - PI/2) * 1.15;
    				var dTmpY = dCenterY + dGraphR * Math.sin(2*PI*i/Daimon.length - PI/2) * 1.15;
    				s.text(dTmpX,dTmpY,Daimon[i])
    				.attr({
    					fontSize:"18px",
    					fill: baseColor,
    					textAnchor:"middle",
    					dominantBaseline:"middle"
    				});
  			}
  		}

  	}


    //得点推移
    function PrintOutputKyoukaResultHistory(dX,dY,lMaxHaiten,Kaisu,StudentResult,CLine)
    {
      let s = Snap("#svgKyoukaResultHistory");

      var dAreaX = dX + 40;
      var dAreaY = dY + 40;
      var dAreaW = 400;
      var dAreaH = 300;

      // //塗りつぶしパターン
      // var p = s.path("M-10,-5,10,15 M15,0,0,-15, M0,-5,20,15").attr({
      //   fill: "none",
      //   stroke: "#fff",
      //   strokeWidth: 1.5
      // });
      // var pattern = p.pattern(0, 0, 10, 10);

      //凡例出力(換算Cライン得点)
      if(true)
      {
        s.rect(dAreaW-90,dY,10,10)
        .attr({fill:CLineColor,stroke: CLineColor});

  	    s.text(dAreaW-70,dY+10,"Cライン得点")
  	      .attr({
  	        fontSize:"14px",
  	        fill: baseColor,
  	        textAnchor:"",
  	        dominantBaseline:""
	    });
      }
      //凡例出力
      if(true)
      {
        s.rect(dAreaW-250,dY,10,10)
        .attr({fill:StudentResultColor,stroke: StudentResultColor});

      	s.text(dAreaW-230,dY+10,"あなたの得点")
            .attr({
            	fontSize:"14px",
          	fill: baseColor,
          	textAnchor:"",
          	dominantBaseline:""
       	});
      }

      //横の罫線出力
      if (true)
      {
      	let iPointSpan = 10;
    		if (lMaxHaiten > 150)
    			iPointSpan = 20;

        var bAdjustFlg = Boolean(false);
        let lTmpPoint = 0;
        while (true)
        {
          let dTmpY = dAreaY+dAreaH-dAreaH*lTmpPoint/lMaxHaiten;

          if (lTmpPoint != 0)
          {

            s.line(dAreaX,dTmpY,dAreaX+dAreaW,dTmpY)
            .attr({
              fill: 'none',
              stroke: dashLineColor,
              strokeWidth: 1,
              strokeDasharray: 5
            });

            s.line(dAreaX,dTmpY,dAreaX-5,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
          }
          s.text(dAreaX-10 ,dTmpY+2,lTmpPoint)
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"end",
            dominantBaseline:"middle"
          });

          if (lTmpPoint == lMaxHaiten)
          {
            break;
          }
          else if (lTmpPoint + iPointSpan > lMaxHaiten)
          {
            lTmpPoint = lMaxHaiten;
            bAdjustFlg = true;
          }
          else
          {
            lTmpPoint += iPointSpan;
          }
        }
      }

      //縦の罫線とテキスト出力
      let dOneW = dAreaW / Kaisu.length;
      for (let i=0;i<Kaisu.length;i++)
      {
        let dTmpX = dAreaX + dOneW*i;

        s.line(dTmpX+dOneW,dAreaY+dAreaH,dTmpX+dOneW,dAreaY+dAreaH+5)
        .attr({
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 1,
        });
        s.text(dTmpX+dOneW/2,dAreaY+dAreaH+15,Kaisu[i])
        .attr({
          fontSize:"14px",
          fill: baseColor,
          textAnchor:"middle",
          dominantBaseline:"middle"
        });
      }

      //棒グラフの幅
      let dGraphW = 30;

      //あなたの換算得点と換算Cライン得点出力
      for (let i=0;i<Kaisu.length;i++)
      {
        let dTmpX = dAreaX + dOneW*i;
        let dChildH = dAreaH * StudentResult[i] / lMaxHaiten;
        if (StudentResult[i]!="")
        {
          s.rect(dTmpX+dOneW*1/4-dGraphW/2+0.5,dAreaY+dAreaH-dChildH,dGraphW,dChildH)
          .attr({fill:StudentResultColor,stroke: StudentResultColor});

          s.text(dTmpX+dOneW*1/4-dGraphW/2+0.5+15,dAreaY+dAreaH-dChildH-10,StudentResult[i])
          .attr({
            fontSize:"14px",
            fill: StudentResultColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
        }

        if(CLine[i]!="")
        {
          //平均点
          let dCLineH = dAreaH * CLine[i] / lMaxHaiten;

          s.rect(dTmpX+dOneW*3/4-dGraphW/2-0.5,dAreaY+dAreaH-dCLineH,dGraphW,dCLineH)
          .attr({fill:CLineColor,stroke: CLineColor});

          // if(i>0)
          // {
          //   s.rect(dTmpX+dOneW*3/4-dGraphW/2-0.5 , dAreaY+dAreaH-dCLineH , dGraphW , dCLineH)
          //   .attr({fill:pattern});
          // }

          s.text(dTmpX+dOneW*3/4-dGraphW/2-0.5+15,dAreaY+dAreaH-dCLineH-10,CLine[i])
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
        }
      }

      //左端線を引く
      s.line(dAreaX,dAreaY,dAreaX,dAreaY+dAreaH+5)
      .attr({
        fill: 'none',
        stroke: baseColor,
        strokeWidth: 1,
      });

      //下線を引く
      s.line(dAreaX-5,dAreaY+dAreaH,dAreaX+dAreaW,dAreaY+dAreaH)
      .attr({
        fill: 'none',
        stroke: baseColor,
        strokeWidth: 1,
      });

      //0を追記
      s.text(dAreaX-10 ,dAreaY+dAreaH+2,"0")
      .attr({
        fontSize:"14px",
        fill: baseColor,
        textAnchor:"end",
        dominantBaseline:"middle"
      });
    }


    function PrintOutputKyoukaSsHistory(dX,dY,Kaisu,StudentResult)
    {
      let s = Snap("#svgKyoukaSsHistory");
      let dAreaX = dX + 40;
      let dAreaY = dY + 40;
      let dAreaW = 400;
      let dAreaH = 300;

      let lMaxSs =80;
      let lMinSs =20;
      //横の罫線出力
      if (true)
      {
        let iPointSpan = 10;

        var bAdjustFlg = Boolean(false);
        let lTmpPoint = 20;
        while (true)
        {
          let dTmpY = dAreaY+dAreaH-(dAreaH*(lTmpPoint-20))/(lMaxSs-lMinSs);

          if (lTmpPoint != 20)
          {
            s.line(dAreaX,dTmpY,dAreaX+dAreaW,dTmpY)
            .attr({
              fill: 'none',
              stroke: dashLineColor,
              strokeWidth: 1,
              strokeDasharray: "5 10"
            });

            s.line(dAreaX,dTmpY,dAreaX-5,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
          }
          else
          {
            s.line(dAreaX-5,dTmpY,dAreaX+dAreaW,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
          }

          s.text(dAreaX-10 ,dTmpY+2,lTmpPoint)
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"end",
            dominantBaseline:"middle"
          });

          if (lTmpPoint == lMaxSs)
          {
            break;
          }
          else if (lTmpPoint + iPointSpan > lMaxSs)
          {
            lTmpPoint = lMaxSs;
            bAdjustFlg = true;
          }
          else
          {
            lTmpPoint += iPointSpan;
          }
        }
      }

      //縦の罫線
      let dOneW = dAreaW / Kaisu.length;
      for (let i=0;i<Kaisu.length;i++)
      {
        var strTestName = Kaisu[i];
        let dTmpX = dAreaX + dOneW*i;

        s.line(dTmpX+dOneW,dAreaY+dAreaH,dTmpX+dOneW,dAreaY+dAreaH+5)
        .attr({
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 1,
        });

       s.text(dTmpX+dOneW/2,dAreaY+dAreaH+15,Kaisu[i])
        .attr({
          fontSize:"14px",
          fill: baseColor,
          textAnchor:"middle",
          dominantBaseline:"middle"
        });
      }

      s.line(dAreaX,dAreaY+dAreaH+5,dAreaX,dAreaY)
      .attr({
        fill: 'none',
        stroke: baseColor,
        strokeWidth: 1,
      });

      let dBeforeX = -1;
      let dBeforeY = -1;

      let dTmpRectWH = 15;
      for (let i=0;i<Kaisu.length;i++)
      {
        let dTmpX = dAreaX + dOneW*i;

        if(StudentResult[i]!="")
        {
          let dChildSS = StudentResult[i];
          if (dChildSS < 20)
            dChildSS = 20;
          if (dChildSS > 80)
            dChildSS = 80;

          let dChildH = dAreaH * (dChildSS-20) / (80-20);

          let dCurrentX = dTmpX+dOneW/2;
          let dCurrentY = dAreaY+dAreaH-dChildH;

          if (dBeforeX != -1 && dBeforeY != -1)
          {
             s.line(dBeforeX,dBeforeY,dCurrentX,dCurrentY)
            .attr({
              fill: 'none',
              stroke: StudentResultColor,
              strokeWidth: 1,
            });
          }

          s.rect(dCurrentX-dTmpRectWH/2,dCurrentY-dTmpRectWH/2,dTmpRectWH,dTmpRectWH)
          .attr({fill:StudentResultColor});
          s.text(dTmpX+dOneW/2,dCurrentY-15,StudentResult[i])
          .attr({
            fontSize:"14px",
            fill: StudentResultColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
          dBeforeX = dCurrentX;
          dBeforeY = dCurrentY;
        }
      }
    }

    //得点分布
    function PrintOutputKyoukaBunpuData(dX,dY,lMaxScale,StudentResult,Bunpus,dLineResultPointC)
    {
      let s = Snap("#svgBunpu");

      let dGraphX = dX + 50;
      let dGraphY = dY + 50;
      let dGraphW = 400;
      let dGraphH = 300;
      let dSubsetH = 2;

      let iPointSpan = 5;
      if (lMaxScale > 150)
        iPointSpan = 10;

      var yScale = [];

      //凡例
      if(true)
      {
        //凡例記載
        makeStar(s,200,10,10,4,5);
        s.text(215,12,"あなたの得点")
        .attr({
         fontSize:"14px",
         fill: "#000",
        });
        s.line(180,35,210,35)
        .attr({
          fill: 'none',
          stroke: "#6cc067",
          strokeWidth: 4
        });
        s.text(215,38,"Cライン得点")
        .attr({
         fontSize:"14px",
         fill: "#000",
        });
        //Cライン得点
        if (dLineResultPointC != "")
        {
          s.text(305, 38 ,dLineResultPointC)
          .attr({
            fontSize:"14px",
            fill: baseColor
          });
        }
        // s.text(dX-50 ,35,"Cライン得点")
        // .attr({
        //  fontSize:"14px",
        //  fill: "#000",
        //  textAnchor:"end",
        // });
        s.text(dGraphX-15, dGraphY-5,"得点")
        .attr({
          fontSize: '14px',
          fill: baseColor,
          textAnchor: "end"
        });
      }

      if (true)
      {
        let lTmpPoint = 0;
        while (true)
        {
          if (lTmpPoint-iPointSpan >= lMaxScale)
            break;

          let lTmpMaxPoint = lTmpPoint;
          let lTmpMinPoint = lTmpPoint-(iPointSpan-1);
          let lTmpChildCount = 0;

          yScale.unshift(lTmpMaxPoint);
          lTmpPoint += iPointSpan;
        }
      }

      let lMaxYScalse  = yScale[0];

      let lMaxChildCount = 0;
      for (let r=0;r<Bunpus.length;r++)
      {
        lMaxChildCount = Math.max(lMaxChildCount,Bunpus[r]);
      }

      //メモリ幅(最大でも5分割にする、メモリは5単位)
      let iMemorySpan = 1;
      if (lMaxChildCount > 5)
      {
        let iTmpSpan = 5;
        while(1)
        {
          if ( Math.floor(lMaxChildCount / iTmpSpan) <= 5)
          {
            iMemorySpan = iTmpSpan;
            break;
          }
          iTmpSpan += 5;
        }
      }

      //分割数
      let iDevideCount = Math.floor((lMaxChildCount + iMemorySpan - 1) / iMemorySpan);
      if (iDevideCount == 1)
        iDevideCount = 2;

      //分割数をひとつ増やす
      iDevideCount++;

      //最大
      let lMaxGraphCount = iMemorySpan * iDevideCount;

      let dOneH = dGraphH / yScale.length;

      // //Cライン得点
      // if (dLineResultPointC != "")
      // {
      //   s.text(dGraphX+dGraphW-5.132, dGraphY-3 ,dLineResultPointC)
      //   .attr({
      //     fontSize:"14px",
      //     fill: baseColor,
      //     textAnchor: "end"
      //   });
      // }

      //横軸メモリを引く
      for (let r=0;r<=iDevideCount;r++)
      {
        let dOneW = dGraphW / iDevideCount;
        let dTmpX = dGraphX + dOneW * r;

        if (r > 0 && r < iDevideCount)
        {
          s.line(dTmpX,dGraphY,dTmpX,dGraphY+dGraphH)
          .attr({
            fill: 'none',
            stroke: dashLineColor,
            strokeWidth: 1,
            strokeDasharray: 5
          });
          s.line(dTmpX,dGraphY+dGraphH,dTmpX,dGraphY+dGraphH+5)
          .attr({
            fill: 'none',
            stroke: baseColor,
            strokeWidth: 1,
          });
        }
        s.text(dTmpX, dGraphY+dGraphH+20,r*iMemorySpan)
        .attr({
          fontSize: '14px',
          fill: baseColor,
          textAnchor: "middle"
        });
      }
      s.line(dGraphX+dGraphW,dGraphY,dGraphX+dGraphW,dGraphY+dGraphH+5)
      .attr({
        fill: 'none',
        stroke: baseColor,
        strokeWidth: 1,
      });

      //縦軸メモリを引く
      for (let r=0;r<yScale.length;r++)
      {
        let dTmpY = dGraphY + dOneH*r;
        if( r > 0 && r < yScale.length )
        {
          s.line(dGraphX,dTmpY,dGraphX-5,dTmpY)
          .attr({
            fill: 'none',
            stroke: baseColor,
            strokeWidth: 1,
          });
        }
        else
        {
          s.line(dGraphX-5,dTmpY,dGraphX+dGraphW,dTmpY)
          .attr({
            fill: 'none',
            stroke: baseColor,
            strokeWidth: 1,
          });
        }
        let lTmpYPoint = yScale[r];
        if(lTmpYPoint > lMaxScale)
          lTmpYPoint = lMaxScale;
        // s.text(dGraphX-15, dTmpY+15,lTmpYPoint>0?"～"+lTmpYPoint:"0")
        // s.text(dGraphX-15, dTmpY+2*dOneH/3,lTmpYPoint>0?"～"+lTmpYPoint:"0")
        s.text(dGraphX-15, dTmpY+2*(dOneH+5)/3,lTmpYPoint>0?"～"+lTmpYPoint:"0")
        .attr({
          fontSize: '14px',
          fill: baseColor,
          textAnchor: "end",
        });
      }
      s.line(dGraphX-5,dGraphY+dGraphH,dGraphX+dGraphW,dGraphY+dGraphH)
      .attr({
        fill: 'none',
        stroke: baseColor,
        strokeWidth: 1,
      });

      //グラフを描く
      for (let r=0;r<Bunpus.length;r++)
      {
        let dTmpY = dGraphY + dOneH*r;

        let lTmpChildCount = Bunpus[r];
        if (lTmpChildCount > 0)
        {
          s.rect(dGraphX, dTmpY+dSubsetH, dGraphW*lTmpChildCount/lMaxGraphCount ,dOneH-dSubsetH*2)
          .attr({
            fill: '#e4ae53',
          });
        }
      }

      if (dLineResultPointC != "")
      {
        //Cライン得点
        let dTmpOutputAveragePoint = dLineResultPointC;

        let dTmpH = dGraphH - dGraphH / Bunpus.length;

        //グラフの表示上の最大値
        let lTmpGraphMaxPoint = lMaxYScalse;

        s.line(dGraphX, dGraphY+dTmpH-dTmpH*dTmpOutputAveragePoint/lTmpGraphMaxPoint, dGraphX+dGraphW ,dGraphY+dTmpH-dTmpH*dTmpOutputAveragePoint/lTmpGraphMaxPoint)
        .attr({
          stroke: CLineColor,
          strokeWidth: "4px"
        });
      }

      //あなたの得点
      for (let r=0;r<yScale.length;r++)
      {
        let dTmpY = dGraphY + dOneH*r +dOneH-dSubsetH;

        let lTmpChildCount = Bunpus[r];

        let lTmpMinPoint = yScale[r]-(iPointSpan-1);
        let lTmpMaxPoint = yScale[r];

        if (lTmpMinPoint <= StudentResult && StudentResult <= lTmpMaxPoint)
        {
          //あなたの得点
          // s.text(dGraphX+dGraphW*lTmpChildCount/lMaxGraphCount + 20, dTmpY, StudentResult)
          s.text(dGraphX+dGraphW*lTmpChildCount/lMaxGraphCount + 20 , dGraphY + dOneH*r + 2*dOneH/3 + yScale.length/dOneH , StudentResult)
          .attr({
            fontSize: '16px',
            fill: StudentResultColor,
          });
          makeStar(s,dGraphX+dGraphW*lTmpChildCount/lMaxGraphCount+10,dTmpY-dOneH/2+dSubsetH,10,4,5);
        }
      }
      //左ラインを最後に引く
      s.line(dGraphX,dGraphY,dGraphX,dGraphY+dGraphH+5)
      .attr({
        fill: 'none',
        stroke: baseColor,
        strokeWidth: 1,
      });
      s.text(dGraphX, dGraphY+dGraphH+20,"0")
      .attr({
        fontSize: '14px',
        fill: baseColor,
        textAnchor: "middle"
      });
    }


    function SibouBunpu(StudentResult,ChildList,RuikeiList)
    {
      let s = Snap("#svgSibouBunpu");

      //最大人数
      let lMaxChildCount = 0;
      for (let r=0;r<ChildList.length;r++)
      {
        lMaxChildCount = Math.max(lMaxChildCount,ChildList[r]);
      }

      //メモリ幅(最大でも5分割にする、メモリは5単位)
      let iMemorySpan = 1;
      if (lMaxChildCount > 5)
      {
        let iTmpSpan = 5;
        while(1)
        {
          if ( Math.floor(lMaxChildCount / iTmpSpan) <= 5)
          {
            iMemorySpan = iTmpSpan;
            break;
          }
          iTmpSpan += 5;
        }
      }

      //分割数
      let iDevideCount = Math.floor((lMaxChildCount + iMemorySpan - 1) / iMemorySpan);
      if (iDevideCount == 1)
        iDevideCount = 2;

      //最大
      let lMaxGraphCount = iMemorySpan * iDevideCount;

      //度数分布
      let dX = 50;
      let dY = 50;
      let dW = 200;
      let dH = 300;
      let dOneH = dH/ChildList.length;
      let dSubsetH = 2;
      let dLastX =0;

      //凡例
      s.text(dW-dX,dY-20,"あなたの偏差値")
      .attr({
        fontSize:"14px",
        fill: baseColor,
        textAnchor:"",
        dominantBaseline:""
      });
      s.line(dW-dX-40,dY-25,dW-dX-8,dY-25)
      .attr({
        fill: 'none',
        stroke: StudentResultColor,
        strokeWidth: 4
      });
      //「偏差値」の文字
      s.text(dX-40,dY-5,"偏差値")
      .attr({
        fontSize:"14px",
        fill: baseColor,
        textAnchor:"",
        dominantBaseline:""
      });
      //「人数」の文字
      s.text(dX-35,dY+dH+20,"人数")
      .attr({
        fontSize:"14px",
        fill: baseColor,
        textAnchor:"",
        dominantBaseline:""
      });

      //縦軸のメモリを引く
      if (iDevideCount > 0)
      {
        for (let r=0;r<=iDevideCount;r++)
        {
          let dOneW = dW / iDevideCount;
          let dTmpX = dX + dOneW * r;

          if (r > 0 && r < iDevideCount)
          {
            if(r > iDevideCount-1)
            {
              s.line(dTmpX,dY,dTmpX,dY+dH)
              .attr({
                  fill: 'none',
                  stroke: baseColor,
                  strokeWidth: 1
              });
            }
            else
            {
              s.line(dTmpX,dY,dTmpX,dY+dH)
              .attr({
                  fill: 'none',
                  stroke: dashLineColor,
                  strokeWidth: 1,
                  strokeDasharray: 5
              });
            }
          }
          else if(r > 0)
          {
            s.line(dTmpX,dY,dTmpX,dY+dH+5)
            .attr({
                fill: 'none',
                stroke: baseColor,
                strokeWidth: 1,
              });
          }

          s.line(dTmpX,dY+dH,dTmpX,dY+dH+5)
          .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });

          s.text(dTmpX-5,dY+dH+20,r*iMemorySpan)
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"",
            dominantBaseline:""
          });

          dLastX = dTmpX;
        }
      }
      else
      {
          dLastX = 250;
          s.line(dX,dY+dH,dX,dY+dH+5)
          .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });

          s.line(dLastX,dY,dLastX,dY+dH+5)
          .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
      }


      dTableLastX=245;
      //表の背景色
      s.rect(dX+250,dY-25,dTableLastX-dX,25)
      .attr({fill:"#ededed"});

      let iTmpIndex = 12;
      //横軸のメモリ
      for(let iSs=15 ; iSs <= 80 ; iSs = iSs+5 )
      {
        // alert(iSs);
        let dTmpY = dY+dH-(dH*(iSs-15))/(80-15);

        if( iSs == 15)
        {
          s.line(dX-5,dTmpY,dLastX,dTmpY)
          .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
          //表の横罫線
          s.line(dX+250,dTmpY,dTableLastX+250,dTmpY)
          .attr({
              fill: 'none',
              stroke: dashLineColor,
              strokeWidth: 1,
            });

        }
        else
        {
          s.line(dX-5,dTmpY,dX,dTmpY)
          .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
          s.text(dX-5,dTmpY+17,"~"+iSs)
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"end",
            dominantBaseline:""
          });
          //表の横罫線
          s.line(dX+250,dTmpY,dTableLastX+250,dTmpY)
          .attr({
              fill: 'none',
              stroke: dashLineColor,
              strokeWidth: 1,
            });
          //表の偏差値列出力
          s.text(dX+300,dTmpY+17,"~"+iSs)
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"end",
            dominantBaseline:""
          });
          //表の分布人数出力
          s.text(dX+355,dTmpY+17,ChildList[iTmpIndex])
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:""
          });
          //表の累積人数出力
          s.text(dX+415,dTmpY+17,RuikeiList[iTmpIndex])
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:""
          });
          iTmpIndex--;
        }
      }

      //表の描画
      if(true)
      {
        //表の縦罫線を出力
        s.line(dX+250,dY-25,dX+250,dY+dH)
        .attr({
            fill: 'none',
            stroke: dashLineColor,
            strokeWidth: 1,
          });
        s.line(dX+326,dY-25,dX+326,dY+dH)
        .attr({
            fill: 'none',
            stroke: dashLineColor,
            strokeWidth: 1,
          });
        s.line(dX+385,dY-25,dX+385,dY+dH)
        .attr({
            fill: 'none',
            stroke: dashLineColor,
            strokeWidth: 1,
          });
        s.line(dTableLastX+250,dY-25,dTableLastX+250,dY+dH)
        .attr({
            fill: 'none',
            stroke: dashLineColor,
            strokeWidth: 1,
          });
        //表の一番上の罫線とタイトル出力
        s.line(dX+250,25,dTableLastX+250,25)
        .attr({
            fill: 'none',
            stroke: dashLineColor,
            strokeWidth: 1,
        });
        //表のヘッダ
        s.text(dX+268,43,"偏差値")
        .attr({
          fontSize:"14px",
          fill: baseColor,
          textAnchor:"",
          dominantBaseline:""
        });
        s.text(dX+328,43,"分布人数")
        .attr({
          fontSize:"14px",
          fill: baseColor,
          textAnchor:"",
          dominantBaseline:""
        });
        s.text(dX+387,43,"累積人数")
        .attr({
          fontSize:"14px",
          fill: baseColor,
          textAnchor:"",
          dominantBaseline:""
        });
      }

      //グラフを描く
      for (let r=0;r<ChildList.length;r++)
      {
        let dTmpY = dY + dOneH*r;

        let lTmpChildCount = ChildList[r];
        if (lTmpChildCount > 0)
        {
          s.rect(dX,dTmpY+dSubsetH,dW * lTmpChildCount/lMaxGraphCount,dOneH-dSubsetH*2)
          .attr({fill:barFillColor});
          // pPdfLib->setcolor("fill","cmyk" , 0.101 , 0.324 , 0.781 , 0);
          // FillRect(dX , dTmpY+dSubsetH , dW * lTmpChildCount / lMaxGraphCount , dOneH-dSubsetH*2);
        }
      }

      //左ラインを引き直す
      s.line(dX,dY,dX,dY+dH)
      .attr({
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 1,
        });
      s.text(dX-4,dY+dH+20,"0")
      .attr({
        fontSize:"14px",
        fill: baseColor,
        textAnchor:"",
        dominantBaseline:""
      });

      if (StudentResult != "" && StudentResult != "Z")
      {
        //あなたの偏差値
        let dTmpOutputSS = StudentResult;

        if (dTmpOutputSS > 80.0)
          dTmpOutputSS = 80.0;

        if (dTmpOutputSS < 15.0)
          dTmpOutputSS = 15.0;

        s.line(dX,dY+dH-dH*(dTmpOutputSS-15)/65,dLastX,dY+dH-dH*(dTmpOutputSS-15)/65)
        .attr({
          fill: 'none',
          stroke: StudentResultColor,
          strokeWidth: 4
        });
      }

    }
    function KyoukaSsCompare(SsPoint,Kyouka){

      let s = Snap("#svgKyoukaSsCompare");

      let dX = 50;
      let dY = 50;
      let dW = 400;
      let dH = 300;

      //凡例出力
      if(true)
      {
        s.text(dX-15,dY-10,"偏差値")
        .attr({
          fontSize:"14px",
          fill: baseColor,
          textAnchor:"middle",
          dominantBaseline:""
        });
      }
      //横の罫線
      for(let iSs=80; iSs>=20; iSs=iSs-10)
      {
        let dTmpY = dY + (dY+dH)/7*((80-iSs)/10);

        //偏差値が80、50、20の場合は実線
        if( iSs==80 || iSs==20 )
        {
          s.line(dX,dTmpY,dX+dW,dTmpY)
          .attr({
            fill: 'none',
            stroke: baseColor,
            strokeWidth: 1,
          });
        }
        else if(iSs==50 )//最後にラインを引く
        {

        }
        else
        {
          s.line(dX,dTmpY,dX+dW,dTmpY)
          .attr({
            fill: 'none',
            stroke: dashLineColor,
            strokeWidth: 1,
            strokeDasharray: 5
          });
        }
        //メモリ線
        s.line(dX,dTmpY,dX-5,dTmpY)
        .attr({
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 1,
        });
        //偏差値メモリ出力
        s.text(dX-15,dTmpY+5,iSs)
        .attr({
          fontSize:"14px",
          fill: baseColor,
          textAnchor:"middle", 
        });
      }
      //縦の罫線
      for(let i=0; i<=Kyouka.length; i++)
      {
        let dTmpX = dX + dW/5*i
        s.line(dTmpX,dY,dTmpX,dY+dH+5)
        .attr({
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 1,
        });
        var KyoukaName = new String(Kyouka[i]);
        if(KyoukaName.length > 6)
        {
            let tmpTxtPath =  "M"+(dTmpX+dW/5*(1/20))+","+(dY+dH+30)+","+(dTmpX+dW/5*(19/20))+","+(dY+dH+30)
                             +"M"+(dTmpX+dW/5*(1/20))+","+(dY+dH+45)+","+(dTmpX+dW/5*(19/20))+","+(dY+dH+45);
            //教科名出力
            s.text(0,0,Kyouka[i])
            .attr({
              fontSize:"12px",
              fill: baseColor,
              textpath: tmpTxtPath
            });
        }
        else
        {
          //教科名出力
          s.text(dTmpX+dW/5/2,dY+dH+30,Kyouka[i])
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
        }
      }

      for(let i=0; i<SsPoint.length; i++)
      {
          if(SsPoint[i]!="")
          {
            let dTmpX = dX + dW/5*i;
            let dTmpCenterY = dY + dH/2;
            let dTmpOneW = dW/5;
            let dTmpOneH = dH/2;
            let dTmpSubsetW = 20;

            let dOutputSS = SsPoint[i];

            if (dOutputSS > 50.0)
            {
              let dTmpUpperSS = dOutputSS-50.0;
              if (dTmpUpperSS > 30.0)
                dTmpUpperSS = 30.0;
              //50以上の偏差値の棒を出力
              s.rect(dTmpX+dTmpSubsetW,dTmpCenterY-dTmpOneH*dTmpUpperSS/30.0,dTmpOneW-dTmpSubsetW*2,dTmpOneH*dTmpUpperSS/30.0)
              .attr({fill:StudentResultColor,stroke: StudentResultColor});
              //偏差値出力
              s.text(dTmpX+dW/5/2,dTmpCenterY-dTmpOneH*dTmpUpperSS/30.0-10,SsPoint[i])
              .attr({
                fontSize:"14px",
                fill: baseColor,
                textAnchor:"middle",
                dominantBaseline:"middle"
              });
            }
            else
            {
              let dTmpLowerSS = 50.0 - dOutputSS;
              if (dTmpLowerSS > 30.0)
                dTmpLowerSS = 30.0;
              //50以下の場合の偏差値棒を出力
              s.rect(dTmpX+dTmpSubsetW,dTmpCenterY,dTmpOneW-dTmpSubsetW*2,dTmpOneH*dTmpLowerSS/30.0)
              .attr({fill:"#adbede",stroke: "#adbede"});
              //数値出力
              s.text(dTmpX+dW/5/2, dTmpCenterY+dTmpOneH*dTmpLowerSS/30.0+15, SsPoint[i])
              .attr({
                fontSize:"14px",
                fill: baseColor,
                textAnchor:"middle",
                dominantBaseline:"middle"
              });
              // PdfOutputBoxTextLine(
              //   m_Http.GetRoundOffString(dOutputSS,1),
              //   dTmpX , dTmpCenterY+dTmpOneH*dTmpLowerSS/30.0+1.0 , dTmpOneW , 2.0 , FONT_LIGHT , GetMmFromPoint(5) , COLOR_BLACK , 0 ,"shrinklimit=0.1");
            }
          }

      }
      //偏差値50の横罫線を最後に描画
      if(true)
      {
        let dTmpY = dY + (dY+dH)/7*((80-50)/10);
        s.line(dX,dTmpY,dX+dW,dTmpY)
        .attr({
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 1,
        });
      }
    }

    function SeisekiBunpu(studentResult,lMaxChildCount,SuccessList,FailureList)
    {
      let s = Snap("#svgSeisekiBunpu");

      let v_SsList = ["~80","~75","~70","~65","~60","~55","~50","~45","~40","~35","~30","~25","~20"]

      let dY = 50;
      let dH = 300;

      let dSuccessX = 30;
      let dSuccessW =190;

      let dFailX = 270;
      let dFailW = 190;

      let dSubsetH = 3;

      if (lMaxChildCount > 0)
      {
        //メモリ幅(最大でも5分割にする、メモリは5単位)
        let iMemorySpan = 1;
        if (lMaxChildCount > 5)
        {
          let iTmpSpan = 5;
          while(1)
          {
            if ( Math.floor(lMaxChildCount / iTmpSpan) <= 5)
            {
              iMemorySpan = iTmpSpan;
              break;
            }
            iTmpSpan += 5;
          }
        }

        //分割数
        let iDevideCount = Math.floor((lMaxChildCount + iMemorySpan - 1) / iMemorySpan);
        if (iDevideCount == 1)
          iDevideCount = 2;

        //最大
        let lMaxGraphCount = iMemorySpan * iDevideCount;

        let dOneH = dH/v_SsList.length;

        //縦軸メモリを引く(合格者)
        s.line(dSuccessX,dY,dSuccessX+dSuccessW+5,dY)
        .attr({
          stroke: baseColor,
          strokeWidth: 1
        });

        for(let i=0 ; i <13 ; i++)
        {
          let dTmpY = dH/13 * (i) +dY;

          iSs = (12-i)*5+20;
          if(iSs==80)
          {
            //合格者
            s.line(dSuccessX,dTmpY,dSuccessX+dSuccessW+5,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
            //不合格者
            s.line(dFailX-5,dTmpY,dFailX+dFailW,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });

              s.text(dSuccessX+dSuccessW+24, dTmpY+12 ,"～80")
              .attr({
                fontSize:"14px",
                fill: baseColor,
                textAnchor:"middle",
                dominantBaseline:"middle"
              });
          }
          else
          {
            s.line(dFailX,dTmpY,dFailX-5,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
            s.line(dSuccessX+dSuccessW,dTmpY,dSuccessX+dSuccessW+5,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
            let tmpMem = "～" + iSs;
            s.text(dSuccessX+dSuccessW+24, dTmpY+12 ,tmpMem)
            .attr({
              fontSize:"14px",
              fill: baseColor,
              textAnchor:"middle",
              dominantBaseline:"middle"
            });
          }
        }
        //合格者の
        s.line(dSuccessX,dY+dH,dSuccessX+dSuccessW+5,dY+dH)
        .attr({
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 1,
        });
        //不合格者
        s.line(dFailX-5,dY+dH,dFailX+dFailW,dY+dH)
        .attr({
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 1,
        });

        let dTmpSuccessX = 0;
        let dTmpFailureX = 0;

        //横軸メモリを引く(合格者)
        for (let r=0;r<=iDevideCount;r++)
        {
          let dOneW = dSuccessW / iDevideCount;
          let dTmpX = dSuccessX + dOneW * r;

          if (r > 0 && r < iDevideCount)
          {
            s.line(dTmpX,dY,dTmpX,dY+dH)
            .attr({
              fill: 'none',
              stroke: dashLineColor,
              strokeWidth: 1,
              strokeDasharray:5
            });
            s.line(dTmpX,dY+dH,dTmpX,dY+dH+5)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
          }
          else if(r==0)
          {
            s.line(dTmpX,dY,dTmpX,dY+dH+5)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
          }
          else
          {
            dTmpSuccessX=dTmpX;
          }
          let tmpMem = "0";
          if((iDevideCount-r)*iMemorySpan>0)
            tmpMem = (iDevideCount-r)*iMemorySpan;

          s.text(dTmpX, dY+dH+20 ,tmpMem)
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
        }

        //横軸メモリを引く(不合格者)
        for (let r=0;r<=iDevideCount;r++)
        {
          let dOneW = dFailW / iDevideCount;
          let dTmpX = dFailX + dOneW * r;

          if (r > 0 && r < iDevideCount)
          {

            s.line(dTmpX,dY,dTmpX,dY+dH)
            .attr({
              fill: 'none',
              stroke: dashLineColor,
              strokeWidth: 1,
              strokeDasharray:5
            });
            s.line(dTmpX,dY+dH,dTmpX,dY+dH+5)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
          }
          else if(r==iDevideCount)
          {
            s.line(dTmpX,dY,dTmpX,dY+dH+5)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
          }
          else
          {
            dTmpFailureX=dTmpX;
          }

          let tmpMem = "0";
          if(r*iMemorySpan>0)
            tmpMem = r*iMemorySpan;

          s.text(dTmpX, dY+dH+20 ,tmpMem)
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
        }
        for (let i=0;i<SuccessList.length;i++)
        {
          //合格者
          s.rect(dSuccessX+dSuccessW-dSuccessW*SuccessList[i]/lMaxGraphCount,
            dY+i*dOneH+dSubsetH,dSuccessW*SuccessList[i]/lMaxGraphCount,dOneH-dSubsetH*2
            )
          .attr({fill:"#e2d94b"});
          //不合格者
          s.rect(dFailX, dY+i*dOneH+dSubsetH,
            dFailW*FailureList[i]/lMaxGraphCount , dOneH-dSubsetH*2
            )
          .attr({fill:"#949599"});
        }

        //最後に0の横軸メモリを描画
        if(true)
        {
          s.line(dTmpSuccessX,dY,dTmpSuccessX,dY+dH+5)
          .attr({
            fill: 'none',
            stroke: baseColor,
            strokeWidth: 1,
          });
          s.line(dTmpFailureX,dY,dTmpFailureX,dY+dH+5)
          .attr({
            fill: 'none',
            stroke: baseColor,
            strokeWidth: 1,
          });
        }

        if (studentResult != "" && studentResult != "Z")
        {
          //あなたの偏差値
          let dTmpOutputSS = studentResult;

          if (dTmpOutputSS > 80.0)
            dTmpOutputSS = 80.0;

          if (dTmpOutputSS < 15.0)
            dTmpOutputSS = 15.0;

          s.line(dSuccessX, dY+dH-dH*(dTmpOutputSS-15)/65 ,dSuccessX+dFailX+dFailW-dSuccessX, dY+dH-dH*(dTmpOutputSS-15)/65 )
          .attr({
            fill: 'none',
            stroke: StudentResultColor,
            strokeWidth: 3,
          });
        }
        //凡例
        if(true)
        {
          s.text(dSuccessX+(dSuccessW)/2, dY-15 ,"合格者")
          .attr({
            fontSize:"16px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
          s.text(dFailX+(dFailW)/2, dY-15 ,"不合格者")
          .attr({
            fontSize:"16px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
          s.text( (dSuccessX+dFailX+(dFailW))/2, dY-15 ,"偏差値")
          .attr({
            fontSize:"16px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
          //凡例
          s.text(dSuccessX+45,dY-38,"あなたの偏差値")
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"",
            dominantBaseline:""
          });
          s.line(dSuccessX,dY-43,dSuccessX+40,dY-43)
          .attr({
            fill: 'none',
            stroke: StudentResultColor,
            strokeWidth: 4
          });
        }
      }
      else//MaxCountが0の場合
      {
        for(let i=0 ; i <13 ; i++)
        {
          let dTmpY = dH/13 * (i) +dY;

          iSs = (12-i)*5+20;
          if(iSs==80)
          {
            //合格者
            s.line(dSuccessX,dTmpY,dSuccessX+dSuccessW+5,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
            //不合格者
            s.line(dFailX-5,dTmpY,dFailX+dFailW,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });

              s.text(dSuccessX+dSuccessW+24, dTmpY+12 ,"～80")
              .attr({
                fontSize:"14px",
                fill: baseColor,
                textAnchor:"middle",
                dominantBaseline:"middle"
              });
          }
          else
          {
            s.line(dFailX,dTmpY,dFailX-5,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
            s.line(dSuccessX+dSuccessW,dTmpY,dSuccessX+dSuccessW+5,dTmpY)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
            let tmpMem = "～" + iSs;
            s.text(dSuccessX+dSuccessW+24, dTmpY+12 ,tmpMem)
            .attr({
              fontSize:"14px",
              fill: baseColor,
              textAnchor:"middle",
              dominantBaseline:"middle"
            });
          }
        }

        //合格者の
        s.line(dSuccessX,dY+dH,dSuccessX+dSuccessW+5,dY+dH)
        .attr({
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 1,
        });
        //不合格者
        s.line(dFailX-5,dY+dH,dFailX+dFailW,dY+dH)
        .attr({
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 1,
        });

        //縦線描画
        if(true)
        {
          s.line(dSuccessX,dY,dSuccessX,dY+dH+5)
          .attr({
            fill: 'none',
            stroke: baseColor,
            strokeWidth: 1,
          });
          s.line(dSuccessX+dSuccessW,dY,dSuccessX+dSuccessW,dY+dH+5)
          .attr({
            fill: 'none',
            stroke: baseColor,
            strokeWidth: 1,
          });
          s.line(dFailX,dY,dFailX,dY+dH+5)
          .attr({
            fill: 'none',
            stroke: baseColor,
            strokeWidth: 1,
          });
          s.line(dFailX+dFailW,dY,dFailX+dFailW,dY+dH+5)
          .attr({
            fill: 'none',
            stroke: baseColor,
            strokeWidth: 1,
          });
        }
        if (studentResult != "" && studentResult != "Z")
        {
          //あなたの偏差値
          let dTmpOutputSS = studentResult;

          if (dTmpOutputSS > 80.0)
            dTmpOutputSS = 80.0;

          if (dTmpOutputSS < 15.0)
            dTmpOutputSS = 15.0;

          s.line(dSuccessX, dY+dH-dH*(dTmpOutputSS-15)/65 ,dSuccessX+dFailX+dFailW-dSuccessX, dY+dH-dH*(dTmpOutputSS-15)/65 )
          .attr({
            fill: 'none',
            stroke: StudentResultColor,
            strokeWidth: 3,
          });
        }
        //凡例
        if(true)
        {
          s.text(dSuccessX+(dSuccessW)/2, dY-15 ,"合格者")
          .attr({
            fontSize:"16px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
          s.text(dFailX+(dFailW)/2, dY-15 ,"不合格者")
          .attr({
            fontSize:"16px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
          s.text( (dSuccessX+dFailX+(dFailW))/2, dY-15 ,"偏差値")
          .attr({
            fontSize:"16px",
            fill: baseColor,
            textAnchor:"middle",
            dominantBaseline:"middle"
          });
          //凡例
          s.text(dSuccessX+45,dY-38,"あなたの偏差値")
          .attr({
            fontSize:"14px",
            fill: baseColor,
            textAnchor:"",
            dominantBaseline:""
          });
          s.line(dSuccessX,dY-43,dSuccessX+40,dY-43)
          .attr({
            fill: 'none',
            stroke: StudentResultColor,
            strokeWidth: 4
          });
        }
      }
    }


    function SougouSuiiNankanYumei(Scales,dSchoolAllHaiten,TestNames,Vals,TargetLine,KonkaiIndx,iKasouHiddenFlg,iNextNendo)
    {
      let s = Snap("#svgSougouSuiiNankanYumei");

    	let dX = 150;
    	let dW = 330;
    	// let dW = 600;
    	let dY = 100;
    	// let dH = 300;
    	let dH = 300;
    	// let dH = 600;
    	let dOneH = dH / (TestNames.length);
    	let dGraphH = 40;

    	let lMaxScale = Scales[Scales.length-1];

    	//凡例
    	if(true)
    	{
        s.rect(10,20,35,18).attr({fill:"#b6d076"});
        	s.text(50,25,"あなたの1次得点")
        	.attr({
            fontSize:'12px',
            fill: baseColor
        	});
        s.text(50,38,"(共通テスト得点)")
        .attr({
          fontSize:'12px',
          fill: baseColor
        });

        s.rect(170,20,35,18).attr({fill:"#b3daea"});
        s.text(210,25,"あなたの2次得点")
        .attr({
          fontSize:'12px',
          fill: baseColor
        });
        s.text(210,38,"(個人入試得点)")
        .attr({
          fontSize:'12px',
          fill: baseColor
        });

        s.rect(320,20,35,18).attr({fill:"#e3d94a"});
        s.text(360,32,"合格者得点ゾーン")
        .attr({
          fontSize:'12px',
          fill: baseColor
        });

        s.rect(10,57,35,7).attr({fill:"#3b8a50"});
        // s.text(50,57,iNextNendo+"年度入試")
        // .attr({
        //   fontSize:'12px',
        //   fill: baseColor
        // });
        s.text(50,65,"最終合格目標得点")
        .attr({
          fontSize:'12px',
          fill: baseColor
        });

        if(iKasouHiddenFlg==0)
        {
          s.rect(170,50,35,18).attr({fill:"#f7b4c7"});
          s.text(210,57,"共通テスト本番レベル")
          .attr({
            fontSize:'12px',
            fill: baseColor
          });
          s.text(210,70,"模試の仮想得点")
          .attr({
            fontSize:'12px',
            fill: baseColor
          });
        }
    	}

      //縦の罫線の描画
      let dTmpNextX = 0;
      for( let i=0 ; i<Scales.length ; i++)
      {
        let dTmpX = dX + dW * Scales[i]/ lMaxScale;

        if( i < Scales.length - 1 )
          dTmpNextX = dX + dW * Scales[i+1] / lMaxScale;

        if(i==0)
        {
          s.text(dTmpX-3,dY-10,Scales[i])
          .attr({
            fontSize: '12px',
            fill: baseColor
          });
        }
        else
        {
          if(i==Scales.length-1)
          {
            s.line(dTmpX,dY-5,dTmpX,dY+dH)
            .attr({
              fill: 'none',
              stroke: baseColor,
              strokeWidth: 1,
            });
          }
          else
          {
            s.line(dTmpX,dY-5,dTmpX,dY+dH)
            .attr({
              fill: 'none',
              stroke: dashLineColor,
              strokeWidth: 1,
              strokeDasharray: 5
            });
          }

    			//次のメモリと違い場合、メモリは表示しない
        	if (dTmpNextX-dTmpX > 25 || i == Scales.length-1)
        	{
        		//メモリが1000以上、且つ最後のメモリの場合、少し右にメモリをずらす
            if(Scales[i] > 999 && i != Scales.length-1 )
            {
              s.text(dTmpX-15,dY-10,Scales[i])
              .attr({
                fontSize: '12px',
                fill: baseColor
              });
            }
            else
            {
              s.text(dTmpX-10,dY-10,Scales[i])
              .attr({
                fontSize: '12px',
                fill: baseColor
              });
            }
        	}
        }
      }

      //横の罫線の描画
    	for(let i=0; i<TestNames.length;i++)
    	{
        let dTmpY = dY + dOneH * i ;
        if( i== 0 )//0は実線
        {
        	s.line(dX,dTmpY,dX+dW,dTmpY)
        	.attr({
            	stroke: baseColor,
            	strokeWidth: "1px",
          	});
        }
        else
        {
          	s.line(dX,dTmpY,dX+dW,dTmpY)
          	.attr({
            	stroke: dashLineColor,
            	strokeWidth: "0.7px",
          	});
        }
        //テスト名の出力
        if(i==KonkaiIndx+1)
        {
          s.text(5,dTmpY+4*dOneH/7,TestNames[i])
          .attr({
              fontSize: '12px',
              fill: StudentResultColor
          });
        }
        else
        {
          s.text(5,dTmpY+4*dOneH/7,TestNames[i])
          .attr({
              fontSize: '12px',
              fill: baseColor
          });
        }
      }
      //一番下の実線を引く
      s.line(dX,dY+dH,dX+dW,dY+dH)
      .attr({
        stroke: baseColor,
        strokeWidth: "1px",
      });

	    //最初は昨年度の結果
    	let LastYearVals = Vals[0];
    	//昨年度の結果
    	if(true)
    	{
        let dNyusiMin = LastYearVals[0];
        let dNyusiMax = LastYearVals[1];
        var dTmpMinGraphW = 0;
        if(dNyusiMin>0)
        {
        	let dTmpY = dY+dOneH*0 + dOneH/2;//グラフのY軸中心点
        	dTmpMinGraphW = ((10*dW)*(10*dNyusiMin)/(10*dSchoolAllHaiten))/10;
  	    	s.rect( dX ,  dY+dOneH*0 + dOneH/2 - dGraphH/2 , dTmpMinGraphW, dGraphH)
      		.attr({
         			fill:"#bdbec1",
          		// stroke: baseColor
        		});
        		s.text(dX+dTmpMinGraphW-45,dTmpY+5,LastYearVals[0])
        		.attr({
	            fontSize: '14px',
	            fill: baseColor,
        		});
      	}
        if(dNyusiMax>0)
        {
        	let dTmpY = dY+dOneH*0 + dOneH/2;//グラフのY軸中心点
          let dTmpMaxGraphW = ((10*dW)*(10*dNyusiMax)/(10*dSchoolAllHaiten))/10-dTmpMinGraphW;
        	s.rect( dX+dTmpMinGraphW , dTmpY-dGraphH/2 , dTmpMaxGraphW , dGraphH)
        	.attr({
	            fill:"#e2d94b",
	            // stroke: baseColor
        	});
        	s.text(dX+dTmpMinGraphW+dTmpMaxGraphW+5,dTmpY+5,LastYearVals[1])
        	.attr({
	            fontSize: '14px',
	            fill: baseColor,
      	    });
        }
    	}

    	//入試本番
    	let ThisYearVals = Vals[Vals.length-1];
    	if(true)
    	{
        let dTmpVal = ThisYearVals[0];
        let dTmpGraphW = ((10*dW)*(10*dTmpVal)/(10*dSchoolAllHaiten))/10;
        let dTmpY = dY+dOneH*(TestNames.length-1) + dOneH/2
        s.rect( dX , dTmpY-dGraphH/2 , dTmpGraphW, dGraphH )
        .attr({
        	fill:"#e2d94b"
        });
        s.text( dX + dTmpGraphW -45, dTmpY+5, ThisYearVals )
        .attr({
          fontSize: '14px',
          fill: baseColor,
          fontWeight: '700'
        });
    	}

      //最終目標得点
      if( TargetLine.length==2)
      {
      	//難関有名は、緑の線のみ描画する
        let lFinal = TargetLine[1];
        s.line( dX+dW*lFinal/lMaxScale , dY+dOneH*1 , dX+dW*lFinal/lMaxScale ,dY+dOneH*1+dOneH*(TestNames.length-1) )
        .attr({
          stroke: "#3b8a50",
          strokeWidth: "4px"
        });
      }

      for(let i=1; i<TestNames.length-1; i++)
      {
        let tmpVals = Vals[i];
        let strTmpFontColor = baseColor;
        if(i==KonkaiIndx+1)
        {
          strTmpFontColor = StudentResultColor;
        }
        let dCenterTokuten = 0.0;
        let dTmpFirstGraphW = 0.0;
        let dTmpSecondGraphW = 0.0;
        //2次の配点がある場合
        if(tmpVals[2]>0)
        {
          //dSchoolHaitenが小数第1位の場合がある為、1度10倍にして計算
          dTmpSecondGraphW = ((10*dW)*(10*tmpVals[2])/(10*dSchoolAllHaiten))/10;
        }

        let dTmpY = dY + dOneH*i+dOneH/2;
        //1次の得点がある場合
        if(tmpVals[0]>0||tmpVals[1]>0)
        {
          //1次の棒グラフ出力
          let strTmpBgColor = "";
          if(tmpVals[0]>0)
          {
            dCenterTokuten=tmpVals[0];
            strTmpBgColor="#f7b4c6";//ピンク
          }
          else
          {
            dCenterTokuten=tmpVals[1];
            strTmpBgColor="#b6d076";//黄緑
          }
          //1次の棒グラフ出力
          dTmpFirstGraphW = ((10*dW)*(10*dCenterTokuten)/(10*dSchoolAllHaiten))/10;
          s.rect(dX+dTmpSecondGraphW, dTmpY-dGraphH/2 , dTmpFirstGraphW ,dGraphH)
          .attr({
            fill:strTmpBgColor
          });
        }

        //2次の得点がある場合
        if(tmpVals[2]>0)
        {
          s.rect(dX, dTmpY-dGraphH/2, dTmpSecondGraphW  ,dGraphH)
          .attr({
            fill:"#b3daeb",//水色
          });

          //2次得点が10点より大きい場合に文字出力
          if(tmpVals[2]>10&&dTmpSecondGraphW>25)
          {
            s.text( dX + dTmpSecondGraphW/2 , dTmpY+dGraphH/7, tmpVals[2] )
            .attr({
              fontSize: '12px',
              fill: strTmpFontColor,
              textAnchor:"middle"
            });
          }
        }

        //2次のグラフの描画が完了してから、1次の得点を描画する
        if(dCenterTokuten>10&&dTmpFirstGraphW>25)
        {
          s.text( dX + dTmpSecondGraphW + dTmpFirstGraphW/2 , dTmpY+dGraphH/7, dCenterTokuten )
          .attr({
            fontSize: '12px',
            fill: strTmpFontColor,
            textAnchor:"middle"
          });
        }

        //1次＋2次の得点を棒グラフ右側に描画
        if(tmpVals[3]>0)
        {
          s.text( dX + dTmpSecondGraphW + dTmpFirstGraphW + 5 , dTmpY+dGraphH/7, tmpVals[3] )
          .attr({
            fontSize: '14px',
            fill: strTmpFontColor
          });
        }
      }

      //今回の枠に線を付ける
      if(KonkaiIndx>=0)
      {
        let dTmpY = dY + dOneH * (KonkaiIndx+1);
        // s.rect(dX-99, dTmpY+3 ,dX+dW+40 , dOneH-6)
        s.rect(2, dTmpY+2 ,dX+dW+10 , dOneH-4)
        .attr({
          fill: 'none',
          stroke: StudentResultColor,
          strokeWidth:"4px"
        });
      }

      //最後に0の罫線を描画
      s.line(dX,dY-5,dX,dY+dH)
      .attr({
        fill: 'none',
        stroke: baseColor,
        strokeWidth: 1,
      });

    }


    function SougouSuii(Scales,TestNames,Vals,GokakuLine,TargetLine,KonkaiIndx,iTestCount,MoshiHeadString,iIsDojituMode,iIsSougouHyouka,CenterTestInfo,iCenterTestID)
    {
      let s = Snap("#svgSougouSuii");

      let dX = 150;
      // let dW = 300;
      let dW = 600;
      let dY = 140;
      // let dH = 300;
      let dH = 400;
      // let dH = 600;
      let dOneH = dH / (TestNames.length);
      let dGraphH = 13;

      let lMaxScale = Scales[Scales.length-1];

      //凡例
      if(true)
      {
        s.rect(10,16,15,10).attr({fill:"#b6d076"});
        if(iCenterTestID > 0 )
        {
          s.text(27,25,"あなたの1次得点")
          .attr({
            fontSize:'12px',
            fill: baseColor
          });
        }
        else
        {
          s.text(27,25,"-")
          .attr({
            fontSize:'12px',
            fill: baseColor
          });
        }

        s.rect(125,16,15,10).attr({fill:"#b3daea"});
        s.text(142,25,"あなたの2次得点")
        .attr({
          fontSize:'12px',
          fill: baseColor
        });
        s.rect(235,16,15,10).attr({fill:"#e3d94a"});
        s.text(252,25,"合格者得点ゾーン")
        .attr({
          fontSize:'12px',
          fill: baseColor
        });
        s.rect(352,16,15,10).attr({fill:"#c7a0c9"});
        s.text(369,25,"合格した先輩の平均点")
        .attr({
          fontSize:'12px',
          fill: baseColor
        });
        s.line(10,35,25,35).attr({stroke:"#34b558",strokeWidth:"4px"});
        // s.text(27,40,"2021年入試最合格目標得点")
        s.text(27,40,TargetLine[0])
        .attr({
          fontSize:'12px',
          fill: baseColor
        });
        s.line(235,35,250,35).attr({stroke:"#87cba0",strokeWidth:"4px"});
        // s.text(252,40,"2021年入試可能得点")
        s.text(252,40,GokakuLine[0])
        .attr({
          fontSize:'12px',
          fill: baseColor
        });
        // s.rect(10,16,15,10).attr({fill:"#b6d076"});
        // s.text(27,25,"あなたの1次得点")
        // .attr({
        //   fontSize:'12px',
        //   fill: baseColor
        // });
        //総合評価版は、仮想得点の凡例を表示しない
        if(iCenterTestID==0)
        {
          s.rect(10,46,15,10).attr({fill:"#f7b4c7"});//ピンク
          s.text(27,55,"-")
          .attr({
            fontSize:'12px',
            fill: baseColor
          });
        }
        else if( (iIsSougouHyouka==0 && iCenterTestID > 0) || iIsDojituMode > 0 )
        {
          s.rect(10,46,15,10).attr({fill:"#f7b4c7"});//ピンク
          s.text(27,55,["共通テスト本番レベル模試の","【仮想得点】"])
          .attr({
            fontSize:'12px',
            fill: baseColor
          }).selectAll("tspan")[1].attr({fill: '#e97298'});
        }


        //凡例下の注釈コメント
        if( iIsDojituMode > 0 || iIsSougouHyouka > 0 )
        {
          if(iCenterTestID>0)
          {
            if(iTestCount > 1)
            {
              s.text(10,70,["※「あなたの２次得点」は換算得点を利用しています。"])
              .attr({
                fontSize:'12px',
                fill: dashLineColor
              });
            }

            if ( iIsDojituMode > 0)
            {
              s.text(10,70,["※共通テスト本番レベル模試未受験の場合、今回の成績から算出した共通テスト本番レベル模試の","【仮想得点】","を表示しています。"])
              .attr({
                fontSize:'12px',
                fill: dashLineColor
              })
              .selectAll("tspan")[1].attr({fill:"#e97298"});
              ;
            }
          }
        }
        else
        {
          if(iCenterTestID>0)
          {
            //                                                                       実施回数  ①   ②   ③   ④   ⑤
            //                                                                     ---------------------------------------------------
            if ((MoshiHeadString == "T" && iTestCount == 99) ||  //東大:   同日  1回    2回    3回    最終
              (MoshiHeadString == "Y" && iTestCount == 99) ||  //京大:   1回    2回    最終
              (MoshiHeadString == "E" && iTestCount == 99) ||  //東北大:  同日  1回    2回
              (MoshiHeadString == "N" && iTestCount == 99) ||  //北大:   1回    2回
              (MoshiHeadString == "Q" && iTestCount == 99) ||  //九大:   1回    2回
              (MoshiHeadString == "A" && iTestCount == 99) ||  //阪大:   1回    2回    最終
              (MoshiHeadString == "M" && iTestCount == 99) ||  //名大:   同日  1回    2回    最終
              (MoshiHeadString == "K" && iTestCount == 99) ||  //神戸大:  1回
              (MoshiHeadString == "C" && iTestCount == 99) ||  //千葉大:  1回
              (MoshiHeadString == "H" && iTestCount == 99))  //広大:   1回
            {
              s.text(10,70,["※今回の成績から算出した共通テスト本番レベル模試の","【仮想得点】","を表示しています。"])
              .attr({
                fontSize:'12px',
                fill: dashLineColor
              })
              .selectAll("tspan")[1].attr({fill:"#e97298"});
              ;
            }
            else
            {
              s.text(10,70,["※今回の成績から算出した共通テスト本番レベル模試の","【仮想得点】","を表示しています。"])
              .attr({
                fontSize:'12px',
                fill: dashLineColor
              })
              .selectAll("tspan")[1].attr({fill:"#e97298"});
              ;
              s.text(10,85,["　あくまで今回の成績に基づいた","【仮想得点】","ですので、必ず「"+CenterTestInfo+"」を受験し、"])
              .attr({
                fontSize:'12px',
                fill: dashLineColor
              })
              .selectAll("tspan")[1].attr({fill:"#e97298"});
              ;
              s.text(10,100,["　実際の得点を使って最終合格目標得点への到達度を確認しましょう。"])
              .attr({
                fontSize:'12px',
                fill: dashLineColor
              });
            }
          }
        }
      }

      //縦の罫線の描画
      let dTmpNextX = 0;
      for( let i=0 ; i<Scales.length ; i++)
      {
        let dTmpX = dX + dW * Scales[i]/ lMaxScale;

        if( i < Scales.length - 1 )
          dTmpNextX = dX + dW * Scales[i+1] / lMaxScale;

        if(i==0)
        {
          s.text(dTmpX-3,dY-10,Scales[i])
          .attr({
            fontSize: '12px',
            fill: baseColor
          });
        }
        else
        {
          s.line(dTmpX,dY,dTmpX,dY+dH)
          .attr({
            fill: 'none',
            stroke: dashLineColor,
            strokeWidth: 1,
            strokeDasharray: 5
          });

          if (dTmpNextX-dTmpX > 25 || i == Scales.length-1)
          {
            if(Scales[i] > 999 && i != Scales.length-1 )
            {
              s.text(dTmpX-15,dY-10,Scales[i])
              .attr({
                fontSize: '12px',
                fill: baseColor
              });
            }
            else
            {
              s.text(dTmpX-10,dY-10,Scales[i])
              .attr({
                fontSize: '12px',
                fill: baseColor
              });
            }

          }
        }
      }
      //横の罫線の描画
      for(let i=0; i<TestNames.length;i++)
      {
        let dTmpY = dY + dOneH * i ;
        if( i== 0 )//0は実線
        {
          s.line(dX,dTmpY,dX+dW,dTmpY)
          .attr({
            stroke: baseColor,
            strokeWidth: "1px",
          });
        }
        else
        {
          s.line(dX,dTmpY,dX+dW,dTmpY)
          .attr({
            stroke: dashLineColor,
            strokeWidth: "0.7px",
            // strokeDasharray: 5
          });
        }
        let tmpTxtPath = "";
        if(i==0||i==TestNames.length-1)
        {
          tmpTxtPath = "M10,"+(dTmpY+2*dOneH/5)+","+(dX-10)+","+(dTmpY+2*dOneH/5)
                        +"M10,"+(dTmpY+3*dOneH/5)+","+(dX-10)+","+(dTmpY+3*dOneH/5)
                        +"M10,"+(dTmpY+4*dOneH/5)+","+(dX-10)+","+(dTmpY+4*dOneH/5);
        }
        else
        {
          let dTmpSpace=4;
          let dLineOneH = dOneH-dTmpSpace*2;
          tmpTxtPath =   "M10, "+(dTmpY+1*dLineOneH/4+dTmpSpace/3)+","+(dX-10)+","+(dTmpY+1*dLineOneH/4+dTmpSpace/3)
                        +"M10,"+(dTmpY+2*dLineOneH/4+dTmpSpace/3)+","+(dX-10)+","+(dTmpY+2*dLineOneH/4+dTmpSpace/3)
                        +"M10,"+(dTmpY+3*dLineOneH/4+dTmpSpace/3)+","+(dX-10)+","+(dTmpY+3*dLineOneH/4+dTmpSpace/3)
                        +"M10,"+(dTmpY+4*dLineOneH/4+dTmpSpace/3)+","+(dX-10)+","+(dTmpY+4*dLineOneH/4+dTmpSpace/3);

          // tmpTxtPath =   "M10,"+(dTmpY+1*dTmpOneH/5+dSpace)+","+(dX-10)+","+(dTmpY+1*dTmpOneH/5+dSpace)
          //               +"M10,"+(dTmpY+2*dTmpOneH/5+dSpace)+","+(dX-10)+","+(dTmpY+2*dTmpOneH/5+dSpace)
          //               +"M10,"+(dTmpY+3*dTmpOneH/5+dSpace)+","+(dX-10)+","+(dTmpY+3*dTmpOneH/5+dSpace)
          //               +"M10,"+(dTmpY+4*dTmpOneH/5+dSpace)+","+(dX-10)+","+(dTmpY+4*dTmpOneH/5+dSpace)
          //               +"M10,"+(dTmpY+5*dTmpOneH/5+dSpace)+","+(dX-10)+","+(dTmpY+5*dTmpOneH/5+dSpace);
          // tmpTxtPath = "M5,"+(dTmpY+2*dOneH/6)+","+(dX-10)+","+(dTmpY+2*dOneH/6)
          //               +"M5,"+(dTmpY+3*dOneH/6)+","+(dX-10)+","+(dTmpY+3*dOneH/6)
          //               +"M5,"+(dTmpY+4*dOneH/6)+","+(dX-10)+","+(dTmpY+4*dOneH/6);
          //               +"M5,"+(dTmpY+5*dOneH/6)+","+(dX-10)+","+(dTmpY+5*dOneH/6);
        }
        if(i==KonkaiIndx+1)
        {
          // s.text(0,dTmpY+dOneH/2,TestNames[i])
          s.text(0,0,TestNames[i])
          .attr({
            fontSize: '11px',
            fill: StudentResultColor,
            textpath: tmpTxtPath,
          });
        }
        else
        {
          // s.text(0,dTmpY+dOneH/2,TestNames[i])
          s.text(0,0,TestNames[i])
          .attr({
            fontSize: '11px',
            fill: baseColor,
            textpath: tmpTxtPath,
          });
        }
      }
      s.line(dX,dY+dH,dX+dW,dY+dH)
      .attr({
        stroke: baseColor,
        strokeWidth: "1px",
      });

      //最初は昨年度の結果
      let LastYearVals = Vals[0];
      //昨年度の結果
      if(true)
      {
        // alert(LastYearVals[i]);
        let dNyusiMin = LastYearVals[0];
        let dNyusiMax = LastYearVals[1];
        if(dNyusiMin>0)
        {
          let dTmpY = dY+dOneH*0 + dOneH/2;//グラフのY軸中心点
          s.rect( dX , dTmpY-dGraphH/2 , dW*dNyusiMin/lMaxScale, dGraphH)
          .attr({
            fill:"#bdbec1",
            stroke: baseColor
          });
          s.text(dX+dW*dNyusiMin/lMaxScale-40,dTmpY+5,LastYearVals[0])
          .attr({
            fontSize: '14px',
            fill: baseColor,
            // textAnchor:"end",
            // dominantBaseline:"middle"
          });
        }
        if(dNyusiMax>0)
        {
          let dTmpY = dY+dOneH*0 + dOneH/2;//グラフのY軸中心点
          s.rect( dX+dW*dNyusiMin/lMaxScale , dTmpY-dGraphH/2 , dW*(dNyusiMax-dNyusiMin)/lMaxScale , dGraphH)
          .attr({
            fill:"#e2d94b",
            stroke: baseColor
          });
          s.text(dX+dW*dNyusiMax/lMaxScale+5,dTmpY+5,LastYearVals[1])
          .attr({
            fontSize: '14px',
            fill: baseColor,
            // textAnchor:"end",
            // dominantBaseline:"middle"
          });
        }
      }

      //入試本番
      let ThisYearVals = Vals[Vals.length-1];
      if(true)
      {
        let dTmpVal = ThisYearVals[0];
        let dTmpY = dY+dOneH*(TestNames.length-1) + dOneH/2
        s.rect( dX , dTmpY-dGraphH/2 , dW*dTmpVal/lMaxScale, dGraphH )
        .attr({
          fill:"#e2d94b",
          stroke: baseColor});
      }

      //最終目標得点
      if( TargetLine.length==2)
      {
        let lFinal = TargetLine[1];
        s.line( dX+dW*lFinal/lMaxScale , dY+dOneH*1 , dX+dW*lFinal/lMaxScale ,dY+dOneH*1+dOneH*(TestNames.length-1) )
        .attr({
          stroke: "#34b558",
          strokeWidth: "4px"
        });
        let tmpTxtPath =  "M"+Math.floor(dX+dW*lFinal/lMaxScale+1)+","+(dY+dOneH*(TestNames.length-1)+15)+","
                             +(dX+dW+20+60)+","+(dY+dOneH*(TestNames.length-1)+15)
                         +",M"+Math.floor(dX+dW*lFinal/lMaxScale+1+15)+","+(dY+dOneH*(TestNames.length-1)+30)+","
                             +(dX+dW+20+60)+","+(dY+dOneH*(TestNames.length-1)+30);
        s.text( 0,0
          ,"← "+TargetLine[0]+" "+lFinal+"点")
        .attr({
          fontSize: '12px',
          fill: baseColor,
          fontWeight: "bold",
          textpath: tmpTxtPath
        });
      }

      //合格可能得点
      if( GokakuLine.length==2 )
      {
        let lNyusiMin = GokakuLine[1];
        s.line( dX+dW*lNyusiMin/lMaxScale , dY+dOneH*1 , dX+dW*lNyusiMin/lMaxScale, dY+dOneH*1+dOneH*(TestNames.length-1) )
        .attr({
          stroke: "#87cba0",
          strokeWidth: "4px",
        });
        let tmpTxtPath =  "M"+Math.floor(dX+dW*lNyusiMin/lMaxScale+1)+","+(dY+dOneH*(TestNames.length)-16)+","
                          +(dX+dW+40)+","+(dY+dOneH*(TestNames.length)-16)
                 +",M"+Math.floor(dX+dW*lNyusiMin/lMaxScale+1+15)+","+(dY+dOneH*(TestNames.length)-4)+","
                     +(dX+dW+40)+","+(dY+dOneH*(TestNames.length)-4);
        s.text( 0,0
          ,"← "+GokakuLine[0]+" "+lNyusiMin+"点")
        .attr({
          fontSize: '12px',
          fill: baseColor,
          fontWeight: "bold",
          textpath: tmpTxtPath
        });
      }


      for(let i=1; i<TestNames.length-1; i++)
      {
        let tmpVals = Vals[i];

        if(tmpVals.length==4)
        {
          let dTmpY = dY + dOneH*i;
          //仮想得点か共通の得点がある場合
          if(tmpVals[0]>0||tmpVals[1]>0)
          {
            let lCenterTokuten = 0;
            //仮想得点の場合
            if(tmpVals[0]>0)
            {
              lCenterTokuten = tmpVals[0];
            }
            else
            {
              lCenterTokuten = tmpVals[1];
            }
            let totalVal = (Number(lCenterTokuten)*10+Number(tmpVals[2])*10)/10;
            var num_obj = new Number(totalVal);
            //あなたの2次得点
            s.rect(dX, dTmpY+dOneH/4-dGraphH/4 , dW*tmpVals[2]/lMaxScale ,dGraphH)
            .attr({
              fill:"#b3daeb",//水色
            });

            if (tmpVals[0]>0) {
              s.rect(dX+dW*tmpVals[2]/lMaxScale, dTmpY+dOneH/4-dGraphH/4
                , dW*lCenterTokuten/lMaxScale ,dGraphH)
              .attr({
              fill:"#f7b4c6",//ピンク
              });
            }
            else
            {
              s.rect(dX+dW*tmpVals[2]/lMaxScale, dTmpY+dOneH/4-dGraphH/4
                , dW*lCenterTokuten/lMaxScale ,dGraphH)
              .attr({
              fill:"#b6d076",//黄緑
              });
            }

            //あなたの1次得点OR仮想得点の値を棒グラフ内に出力
            //1次得点/仮想得点が0以上で、棒グラフのサイズが25より大きければ文字を表示
            if(lCenterTokuten>0&&(dW*lCenterTokuten/lMaxScale)>25)
            {
              // s.text( dX + dW*lCenterTokuten/lMaxScale/2 , dTmpY+dOneH/4+dGraphH/2+2 , lCenterTokuten )
              s.text( dX + ( dW*tmpVals[2]/lMaxScale ) + dW*lCenterTokuten/lMaxScale/2 , dTmpY+dOneH/4+dGraphH/2+2 , lCenterTokuten )
              .attr({
                fontSize: '14px',
                fill: baseColor,
                fontWeight: "bold",
                textAnchor:"middle"
              });
            }
            if(tmpVals[2]>0&& (dW*tmpVals[2]/lMaxScale)>25 )
            {
              // s.text( dX + ( dW*lCenterTokuten/lMaxScale ) + dW*tmpVals[2]/lMaxScale/2 , dTmpY+dOneH/4+dGraphH/2+2 , tmpVals[2] )
              s.text( dX +  dW*tmpVals[2]/lMaxScale/2 , dTmpY+dOneH/4+dGraphH/2+2 , tmpVals[2] )
              .attr({
                fontSize: '14px',
                fill: baseColor,
                fontWeight: "bold",
                textAnchor:"middle"
              });
            }

            s.rect(dX, dTmpY+dOneH/4-dGraphH/4
              , dW*totalVal/lMaxScale ,dGraphH)
            .attr({
              fill:"none",
              stroke: baseColor
            });
            if(i==KonkaiIndx+1)
            {
              if(totalVal==0)
              {
                 s.text( dX + dW*totalVal/lMaxScale+5 , dTmpY+dOneH/4+dGraphH/2+2 , "0.0" )
                .attr({
                  fontSize: '14px',
                  fill: StudentResultColor,
                  fontWeight: "bold"
                });
              }
              else
              {
                s.text( dX + dW*totalVal/lMaxScale+5 , dTmpY+dOneH/4+dGraphH/2+2 , num_obj.toFixed(1) )
                .attr({
                  fontSize: '14px',
                  fill: StudentResultColor,
                  fontWeight: "bold"
                });
              }
            }
            else
            {
              if(totalVal==0)
              {
                s.text( dX + dW*totalVal/lMaxScale+5 , dTmpY+dOneH/4+dGraphH/2+2 , "0.0")
                .attr({
                  fontSize: '14px',
                  fill: baseColor,
                  fontWeight: "bold"
                });
              }
              else
              {
                s.text( dX + dW*totalVal/lMaxScale+5 , dTmpY+dOneH/4+dGraphH/2+2 , num_obj.toFixed(1) )
                .attr({
                  fontSize: '14px',
                  fill: baseColor,
                  fontWeight: "bold"
                });
              }
            }
          }
          else if(tmpVals[2]!="")
          {
            //あなたの得点
            s.rect(dX, dTmpY+dOneH/4-dGraphH/4 , dW*tmpVals[2]/lMaxScale ,dGraphH)
            .attr({
            fill:"#b3daeb",
            });
            s.rect(dX, dTmpY+dOneH/4-dGraphH/4
              , dW*tmpVals[2]/lMaxScale ,dGraphH)
            .attr({
              fill:"none",
              stroke: baseColor
            });
            if( (dW*tmpVals[2]/lMaxScale)>25)
            {
              s.text( dX +  dW*tmpVals[2]/lMaxScale/2 , dTmpY+dOneH/4+dGraphH/2+2 , tmpVals[2] )
              .attr({
                fontSize: '14px',
                fill: baseColor,
                fontWeight: "bold",
                textAnchor:"middle"
              });
            }

            if(i==KonkaiIndx+1)
            {
              if(tmpVals[2]==0)
              {
                s.text( dX + dW*tmpVals[2]/lMaxScale+5 , dTmpY+dOneH/4+dGraphH/2+2 , "0.0" )
                .attr({
                  fontSize: '14px',
                  fill: StudentResultColor,
                  fontWeight: "bold"
                });
              }
              else
              {
                s.text( dX + dW*tmpVals[2]/lMaxScale+5 , dTmpY+dOneH/4+dGraphH/2+2 , tmpVals[2] )
                .attr({
                  fontSize: '14px',
                  fill: StudentResultColor,
                  fontWeight: "bold"
                });
              }
            }
            else
            {
              if(tmpVals[2]==0)
              {
                s.text( dX + dW*tmpVals[2]/lMaxScale+5 , dTmpY+dOneH/4+dGraphH/2+2 , "0.0" )
                .attr({
                  fontSize: '14px',
                  fill: baseColor,
                  fontWeight: "bold"
                });
              }
              else
              {
                s.text( dX + dW*tmpVals[2]/lMaxScale+5 , dTmpY+dOneH/4+dGraphH/2+2 , tmpVals[2] )
                .attr({
                  fontSize: '14px',
                  fill: baseColor,
                  fontWeight: "bold"
                });
              }
            }
          }

          if(tmpVals[3]>0)
          {
            //合格した先輩の平均点
            s.rect(dX, dTmpY+dOneH/2+dGraphH/4 , dW*tmpVals[3]/lMaxScale ,dGraphH)
            .attr({
            fill:"#c7a0ca",
            // stroke: baseColor
            });
            s.text( dX + dW*tmpVals[3]/lMaxScale+5 , dTmpY+dOneH/2+dGraphH/2+7, tmpVals[3] )
            .attr({
              fontSize: '14px',
              fill: baseColor,
            });
          }
        }
      }

      //今回の枠に線を付ける
      if(KonkaiIndx>=0)
      {
        let dTmpY = dY + dOneH * (KonkaiIndx+1);
        // s.rect(dX-99, dTmpY+3 ,dX+dW+40 , dOneH-6)
        s.rect(2, dTmpY+2 ,dX+dW+100 , dOneH-4)
        .attr({
          fill: 'none',
          stroke: StudentResultColor,
          strokeWidth:"2px"
        });
        s.rect(dX+dW+40+5, dTmpY+dOneH/2-10 ,35 , 20)
        .attr({
          fill: StudentResultColor,
          stroke: StudentResultColor,
          strokeWidth:"2px"
        });
        s.text(dX+dW+5+42, dTmpY+dOneH/2+5,"今回")
        .attr({
          fill: '#fff',
          fontSize: '15px',
          fontWeight: 'bold'
        });
      }

      //最後に0の罫線を描画
      s.line(dX,dY,dX,dY+dH)
      .attr({
        fill: 'none',
        stroke: baseColor,
        strokeWidth: 1,
      });


    }

