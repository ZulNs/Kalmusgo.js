/*
 * Kalmusgo.js: Kalender Musim Gorontalo
 * 
 * Didesain oleh ZulNs, @Gorontalo, Indonesia, 30 Agustus 2017
 * Berdasarkan ide/catatan saudara Amirudin Dako
 * Direvisi menggunakan W3CSS pada 29 April 2019
 */
'use strict';
function Kalmusgo(isHijr,year,month,firstDay,lang,theme,tmout){
	if(typeof HijriDate=='undefined')throw new Error('HijriDate() class required!');
	let kmg=typeof this=='object'?this:window,gdate=new Date(),hdate=new HijriDate(),dispDate,tzOffset=Date.parse('01 Jan 1970'),
	gridAni='zoom',actTmoId,isDispToday=false,isAccFirstDayOpened=false,isAccEvtsOpened=false,isAutoNewTheme,isRTL=false,
	aboutElm,aboutTitleElm,aboutDateElm,aboutCloseBtnElm,evtMode=6,isJinxedOn=false,
	isSmallScreen=(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)<520,
	createElm=function(tagName,className,innerHTML){
		let el=document.createElement(tagName);if(className)el.className=className;if(innerHTML)el.innerHTML=innerHTML;return el
	},
	addEvt=function(el,ev,cb){
		if(window.addEventListener)el.addEventListener(ev,cb);else if(el.attachEvent)el.attachEvent('on'+ev,cb);else el['on'+ev]=cb
	},
	contElm=createElm('div','zulns-kalmusgo'),
	calElm=createElm('div','w3-card-4'),
	headerElm=createElm('div','w3-display-container w3-theme'),
	evtElm=createElm('div','w3-large unbreakable'),
	todayElm=createElm('div','w3-display-topright w3-large unbreakable'),
	yearValElm=createElm('div','w3-display-middle w3-xlarge unbreakable'),
	monthValElm=createElm('div','w3-display-bottommiddle w3-large unbreakable'),
	menuBtnElm=createElm('button','w3-button w3-ripple','<svg width="18" height="23"><path d="M0 6L18 6L18 8L0 8Z M0 13L18 13L18 15L0 15Z M0 20L18 20L18 22L0 22Z"/></svg>'),
	menuWrapElm=createElm('div','w3-dropdown-content w3-bar-block w3-border w3-light-grey w3-small'),
	accFirstDayElm=createElm('div','w3-white w3-border-bottom'),
	accEvtsElm=createElm('div','w3-white w3-border-bottom'),
	menuCalModElm=createElm('button','w3-bar-item w3-button w3-ripple'),
	menuFirstDayElm=createElm('button','w3-bar-item w3-button w3-ripple collapsed','<span></span><span class="w3-right"><svg width="10" height="10"><path d="M1 3L5 7L9 3Z"/></svg></span><span class="w3-right"><svg width="10" height="10"><path d="M1 7L5 3L9 7Z"/></svg></span>'),
	menuEvtsElm=createElm('button','w3-bar-item w3-button w3-ripple collapsed','<span></span><span class="w3-right"><svg width="10" height="10"><path d="M1 3L5 7L9 3Z"/></svg></span><span class="w3-right"><svg width="10" height="10"><path d="M1 7L5 3L9 7Z"/></svg></span>'),
	menuTodayElm=createElm('button','w3-bar-item w3-button w3-ripple'),
	menuNewThemeElm=createElm('button','w3-bar-item w3-button w3-ripple'),
	menuAboutElm=createElm('button','w3-bar-item w3-button w3-ripple'),
	menuCloseElm=createElm('button','w3-bar-item w3-button w3-ripple'),
	wdayTitleElm=createElm('div','w3-cell-row w3-center w3-light-grey'),
	gridsElm=createElm('div','w3-white'),
	legendElm=createElm('div','w3-large'),
	createStyle=function(){
		let stl=document.getElementById('ZulNsKalmusgoStyle'),ct=Kalmusgo.themes,ctl=ct.length;
		if(stl)return false;
		let str='svg{stroke:currentColor;fill:currentColor;stroke-width:1}'+
			'.w3-button{background-color:transparent}'+
			'.w3-bar-item{border-left:6px solid transparent!important}'+
			'.w3-bar-item:not(:disabled):hover{border-color:#f44336!important}'+
			'.w3-bar-item:focus{border-color:#2196F3!important}'+
			'.w3-bar-item.expanded{color:#fff;background-color:#616161}'+
			'button.collapsed + div,button.collapsed>:nth-child(3),button.expanded>:nth-child(2){display:none!important}'+
			'.right-to-left .w3-cell{float:right!important}'+
			'.unbreakable{overflow:hidden;white-space:nowrap}'+
			'button.w3-button:not(.w3-bar-item){padding:4px 10px!important}'+
			'.styled{box-shadow: 0 1px 4px rgba(0,0,0,.8);border-radius:4px}';
		stl=createElm('style',null,str);stl.id='ZulNsKalmusgoStyle';stl.type='text/css';document.body.appendChild(stl);return true
	},
	createAboutModal=function(){
		aboutElm=document.getElementById('ZulNsAbout');
		if(aboutElm){
			aboutTitleElm=document.getElementById('ZulNsAboutTitle');
			aboutDateElm=document.getElementById('ZulNsAboutDate');
			aboutCloseBtnElm=document.getElementById('ZulNsAboutCloseButton');
			return false
		}
		aboutElm=createElm('div','w3-modal');
		let cont=createElm('div','w3-modal-content w3-card-4 w3-border w3-display w3-black w3-animate-zoom'),
			info=createElm('div','w3-display-middle w3-bar w3-center'),
			zulns=createElm('p',null,'<span class="w3-tag w3-jumbo w3-red">Z</span>&nbsp;<span class="w3-tag w3-jumbo w3-yellow">u</span>&nbsp;<span class="w3-tag w3-jumbo w3-blue">l</span>&nbsp;<span class="w3-tag w3-jumbo w3-green">N</span>&nbsp;<span class="w3-tag w3-jumbo w3-purple">s</span>');
		aboutCloseBtnElm=createElm('button','w3-button w3-ripple w3-display-topright','<svg width="18" height="19"><path d="M5 9L5 10L8 13L5 16L5 17L6 17L9 14L12 17L13 17L13 16L10 13L13 10L13 9L12 9L9 12L6 9Z"/></svg>');
		aboutTitleElm=createElm('p','w3-xlarge');aboutDateElm=createElm('p','w3-large');aboutElm.id='ZulNsAbout';
		aboutElm.style.display='none';aboutElm.setAttribute('callback',null);
		cont.style.cssText='width:440px;height:300px;cursor:default';
		aboutCloseBtnElm.id='ZulNsAboutCloseButton';aboutTitleElm.id='ZulNsAboutTitle';aboutDateElm.id='ZulNsAboutDate';
		info.appendChild(aboutTitleElm);info.appendChild(zulns);info.appendChild(aboutDateElm);cont.appendChild(info);
		cont.appendChild(aboutCloseBtnElm);aboutElm.appendChild(cont);document.body.appendChild(aboutElm);
		addEvt(aboutCloseBtnElm,'click',function(){
			aboutElm.style.display='none';aboutTitleElm.innerHTML='';aboutDateElm.innerHTML='';
			if(typeof aboutElm.callback=='function')aboutElm.callback();aboutElm.callback=null
		});return true
	},
	createCal=function(){
		let rootMenuElm=createElm('div','w3-dropdown-click w3-display-topleft'),
			prevYearBtnElm=createElm('button','w3-button w3-ripple w3-display-left','<svg width="18" height="23"><path d="M7 7L2 15L7 23L9 23L4 15L9 7Z M14 7L9 15L14 23L16 23L11 15L16 7Z"/></svg>'),
			nextYearBtnElm=createElm('button','w3-button w3-ripple w3-display-right','<svg width="18" height="23"><path d="M11 7L16 15L11 23L9 23L14 15L9 7Z M4 7L9 15L4 23L2 23L7 15L2 7Z"/></svg>'),
			prevMonthBtnElm=createElm('button','w3-button w3-ripple w3-display-bottomleft','<svg width="18" height="23"><path d="M10 7L5 15L10 23L12 23L7 15L12 7Z"/></svg>'),
			nextMonthBtnElm=createElm('button','w3-button w3-ripple w3-display-bottomright','<svg width="18" height="23"><path d="M8 7L13 15L8 23L6 23L11 15L6 7Z"/></svg>');
		headerElm.style.height='124px';
		evtElm.style.cssText='position:absolute;margin:10px 0px 0px 54px';
		todayElm.style.cssText='margin:10px 16px 0px 0px;cursor:default';
		yearValElm.style.cursor=gridsElm.style.cursor='default';
		monthValElm.style.cssText='margin-bottom:10px;cursor:default';
		rootMenuElm.style.cssText='margin:6px 0px 0px 6px';
		prevYearBtnElm.style.cssText='margin-left:6px';
		nextYearBtnElm.style.cssText='margin-right:6px';
		prevMonthBtnElm.style.cssText='margin:0px 0px 6px 6px';
		nextMonthBtnElm.style.cssText='margin:0px 6px 6px 0px';
		wdayTitleElm.style.cssText='padding:4px 0px;margin-bottom:4px';
		menuWrapElm.style.width='188px';
		legendElm.style.cssText='margin-top:16px';
		menuWrapElm.appendChild(menuCalModElm);
		menuWrapElm.appendChild(menuFirstDayElm);menuWrapElm.appendChild(accFirstDayElm);
		menuWrapElm.appendChild(menuEvtsElm);menuWrapElm.appendChild(accEvtsElm);
		menuWrapElm.appendChild(menuTodayElm);
		menuWrapElm.appendChild(menuNewThemeElm);
		menuWrapElm.appendChild(menuAboutElm);
		menuWrapElm.appendChild(menuCloseElm);
		rootMenuElm.appendChild(menuBtnElm);rootMenuElm.appendChild(menuWrapElm);
		headerElm.appendChild(evtElm);
		headerElm.appendChild(todayElm);headerElm.appendChild(yearValElm);headerElm.appendChild(monthValElm);
		headerElm.appendChild(rootMenuElm);headerElm.appendChild(prevYearBtnElm);headerElm.appendChild(nextYearBtnElm);
		headerElm.appendChild(prevMonthBtnElm);headerElm.appendChild(nextMonthBtnElm);gridsElm.appendChild(wdayTitleElm);
		calElm.appendChild(headerElm);calElm.appendChild(gridsElm);
		contElm.appendChild(calElm);contElm.appendChild(legendElm);
		addEvt(menuBtnElm,'click',onClickMenu);addEvt(menuCalModElm,'click',onChgCalMod);
		addEvt(menuFirstDayElm,'click',onFirstDay);addEvt(menuEvtsElm,'click',onEvts);
		addEvt(menuTodayElm,'click',onDispToday);addEvt(menuNewThemeElm,'click',onNewTheme);addEvt(menuAboutElm,'click',onAbout);
		addEvt(menuCloseElm,'click',onClose);addEvt(prevYearBtnElm,'click',onDecYear);addEvt(nextYearBtnElm,'click',onIncYear);
		addEvt(prevMonthBtnElm,'click',onDecMonth);addEvt(nextMonthBtnElm,'click',onIncMonth);addEvt(window,'resize',onRszWdw);
		for(let i=0;i<7;i++){
			let el=createElm('button','w3-bar-item w3-button w3-ripple');
			el.setAttribute('firstday',i);
			addEvt(el,'click',onSelFirstDay);
			accFirstDayElm.appendChild(el)
		}let m=Kalmusgo.getVal('events');
		for(let i=0;i<m.length;i++){
			let el=createElm('button','w3-bar-item w3-button w3-ripple','&#9679;&nbsp;'+m[i]);
			if(i>4){replaceClass(el,'w3-button w3-ripple','w3-transparent');el.disabled=true}
			el.setAttribute('event',i);
			addEvt(el,'click',onSelEvt);
			accEvtsElm.appendChild(el);
		}updMenuLbl();updCalModMenuLbl();updFirstDayMenuLbl();updHeader();createWdayTitle();createDates()
	},
	updMenuLbl=function(){
		let c=Kalmusgo.getVal;
		menuFirstDayElm.children[0].innerHTML=c('menuItem1');
		menuEvtsElm.children[0].innerHTML=c('menuItem2');
		menuTodayElm.innerHTML=c('menuItem3');
		menuNewThemeElm.innerHTML=c('menuItem4');
		menuAboutElm.innerHTML=c('menuItem5');
		menuCloseElm.innerHTML=c('menuItem6')+'<span class="w3-right">&times;</span>';
	},
	updCalModMenuLbl=function(){
		menuCalModElm.innerHTML=Kalmusgo.getVal('menuItem0')[isHijr?1:0];
	},
	updFirstDayMenuLbl=function(){
		for(let i=0;i<7;i++)accFirstDayElm.children[i].innerHTML='&#9679;&nbsp;'+dispDate.getWeekdayName(i)
	},
	updTodayLbl=function(){todayElm.innerHTML=isSmallScreen?dispDate.todayShortString():dispDate.todayString()},
	updHeader=function(){
		yearValElm.innerHTML=Kalmusgo.getDigit(dispDate.getYearString());
		monthValElm.innerHTML=dispDate.getMonthName()
	},
	createWdayTitle=function(){
		let el=accFirstDayElm.children[firstDay];
		replaceClass(el,'w3-button w3-ripple','w3-transparent');el.disabled=true;
		for(let i=firstDay;i<7+firstDay;i++){
			let day=createElm('div','w3-cell unbreakable',isSmallScreen?dispDate.getWeekdayShortName(i):dispDate.getWeekdayName(i));
			if(i%7==5)day.className+=' w3-text-teal';
			if(i%7==0)day.className+=' w3-text-red';
			day.style.width='14.2857%';wdayTitleElm.appendChild(day)
		}
	},
	recreateWdayTitle=function(){
		while(wdayTitleElm.firstChild)wdayTitleElm.removeChild(wdayTitleElm.firstChild);createWdayTitle()
	},
	createDates=function(){
		let dispTm=dispDate.getTime(),ppdr=dispDate.getDay()-firstDay;
		if(ppdr<0)ppdr+=7;
		let pcdr=dispDate.getDayCountInMonth(),pndr=(7-(ppdr+pcdr)%7)%7;
		dispDate.setDate(1-ppdr);syncDates();
		let pdate=dispDate.getDate(),sdate=getOppsDate().getDate(),pdim=dispDate.getDayCountInMonth(),sdim=getOppsDate().getDayCountInMonth(),
			smsn=getOppsDate().getMonthShortName(),isFri=(13-firstDay)%7,isSun=(8-firstDay)%7,gridCtr=0,ttc,isToday,
			gdt,hmonth=hdate.getMonth(),gmonth=gdate.getMonth(),phmonth=hmonth,desc,isStyled,
			isLowanga,isMusimTanam,isMusimKawin,isMusimBangunRumah,
			isLegendLowanga=false,isLegendTualangaSore=false,isLegendHulitaPobole=false,isLegendTualangaPagi=false,
			isLegendTauwa=false,isLegendTeduh=false,isLegendPancaroba=false,isLegendAnginTimur=false,isLegendAnginBarat=false,
			isLegendBolehKawin=false,isLegendDilarangKawin=false,isLegendBolehBangunRumah=false,isLegendDilarangBangunRumah=false;
		dispDate.setDate(1);getOppsDate().setDate(1);
		if(isDispToday){
			isDispToday=false;replaceClass(menuTodayElm,'w3-transparent','w3-button w3-ripple');menuTodayElm.disabled=false
		}
		for(let i=1;i<=ppdr+pcdr+pndr;i++){
			if(gridCtr==0){var row=createElm('div','w3-cell-row w3-center');gridsElm.appendChild(row)}
			let grid=createElm('div','w3-cell w3-animate-'+gridAni),
				pde=createElm('div','w3-large'),sde=createElm('div','w3-small unbreakable');
			ttc=dispDate.getTime()+(pdate-1)*864e5;
			grid.style.cssText='width:14.2857%;padding:3px 0px';
			grid.appendChild(pde);grid.appendChild(sde);row.appendChild(grid);
			isToday=getCurTime()==ttc;
			if(i<=ppdr||ppdr+pcdr<i){
				if(i%7==isFri)grid.className+=' w3-text-teal';
				else if(i%7==isSun)grid.className+=' w3-text-red';
				grid.className+=' w3-disabled';grid.style.cursor='default'
			}else{
				isStyled=false;
				if(26586e6==ttc){
					grid.className+=' w3-black w3-btn w3-ripple';
					grid.style.cursor='pointer';
					addEvt(grid,'click',onAbout);
					isStyled=true;
					grid.title=String.fromCharCode(0x2a,0x2a,0x2a,0x20,0x5a,0x75,0x6c,0x4e,0x73,0x20,0x2a,0x2a,0x2a)
				}
				if(isJinxedOn){
					switch((i%7+firstDay)%7){
						case 1:isLowanga=(hmonth==0);break;
						case 2:isLowanga=(hmonth==10);break;
						case 3:isLowanga=(hmonth==3||hmonth==8);break;
						case 4:isLowanga=(hmonth==1||hmonth==11);break;
						case 5:isLowanga=(hmonth==4||hmonth==7);break;
						case 6:isLowanga=(hmonth==2||hmonth==6);break;
						case 0:isLowanga=(hmonth==5||hmonth==9)
					}
					if(isLowanga){
						desc='LOWANGA';
						if(isStyled)grid.title+=', '+desc;
						else{
							grid.className+=' w3-red';
							grid.title=desc;
							isStyled=true
						}
						if(!isLegendLowanga){
							createLegend('w3-pale-red w3-border-red',desc);
							isLegendLowanga=true
						}
					}
				}
				if(evtMode==0){ //musim-tanam
					gdt=isHijr?sdate:pdate;
					switch(gmonth){
						case 0:isMusimTanam=(gdt<=6||21<=gdt);break;
						case 1:isMusimTanam=(gdt<=8||21<=gdt);break;
						case 2:isMusimTanam=(gdt<=14||21<=gdt);break;
						case 3:isMusimTanam=(gdt<=6||21<=gdt);break;
						case 4:isMusimTanam=(gdt<=8||23<=gdt);break;
						case 5:isMusimTanam=(gdt<=14||23<=gdt);break;
						case 6:isMusimTanam=(gdt<=6||23<=gdt);break;
						case 7:isMusimTanam=(gdt<=8||23<=gdt);break;
						case 8:isMusimTanam=(gdt<=14||21<=gdt);break;
						case 9:isMusimTanam=(gdt<=16||21<=gdt);break;
						case 10:isMusimTanam=(gdt<=8||21<=gdt);break;
						case 11:isMusimTanam=(gdt<=14||23<=gdt)
					}
					if(isMusimTanam){
						if(gmonth==11&&gdt>=30||gmonth<2||gmonth==2&&gdt<=29){
							desc = 'Periode Rendengan, Tualanga Sore';
							if(!isStyled){
								grid.className+=' w3-green';
								if(!isLegendTualangaSore){
									createLegend('w3-pale-green w3-border-green',desc);
									isLegendTualangaSore=true
								}
							}
						}
						else if(gmonth<5||gmonth==5&&gdt<=29){
							desc = 'Periode Gadu, Hulita/Pobole';
							if(!isStyled){
								grid.className+=' w3-brown';
								if(!isLegendHulitaPobole){
									createLegend('w3-sand w3-border-brown',desc);
									isLegendHulitaPobole=true
								}
							}
						}
						else if(gmonth<9||gmonth==9&&gdt<=3){
							desc = 'Periode Gadu, Tualanga Pagi';
							if(!isStyled){
								grid.className+=' w3-amber';
								if(!isLegendTualangaPagi){
									createLegend('w3-pale-yellow w3-border-amber',desc);
									isLegendTualangaPagi=true
								}
							}
						}
						else{
							desc = 'Periode Rendengan, Tauwa';
							if(!isStyled){
								grid.className+=' w3-blue';
								if(!isLegendTauwa){
									createLegend('w3-pale-blue w3-border-blue',desc);
									isLegendTauwa=true
								}
							}
						}
						if(isStyled)grid.title+=', '+desc;
						else{
							grid.title=desc;
							isStyled = true
						}
					}
				}else if(evtMode==1){ //musim-melaut
					switch(gmonth){
						case 0:case 1:case 2:
							desc = 'Musim Teduh';
							if(!isStyled){
								grid.className+=' w3-green';
								if (!isLegendTeduh) {
									createLegend('w3-pale-green w3-border-green',desc);
									isLegendTeduh=true
								}
							}
							break;
						case 3:case 4:
							desc='Musim Pancaroba';
							if(!isStyled){
								grid.className+=' w3-brown';
								if (!isLegendPancaroba) {
									createLegend('w3-sand w3-border-brown',desc);
									isLegendPancaroba=true
								}
							}
							break;
						case 5:case 6:case 7:case 8:
							desc='Musim Angin Timur';
							if(!isStyled){
								grid.className+=' w3-amber';
								if (!isLegendAnginTimur) {
									createLegend('w3-pale-yellow w3-border-amber',desc);
									isLegendAnginTimur=true
								}
							}
							break;
						case 9:case 10:case 11:
							desc='Musim Angin Barat';
							if(!isStyled){
								grid.className+=' w3-blue';
								if (!isLegendAnginBarat) {
									createLegend('w3-pale-blue w3-border-blue',desc);
									isLegendAnginBarat=true
								}
							}
					}
					if(isStyled)grid.title+=', '+desc;
					else{
						grid.title=desc;
						isStyled = true
					}
				}else if(evtMode==2){ //musim-hajatan
					isMusimKawin=false;
					switch(hmonth){
						case 0:desc='Tiada mufakat, mati segera';break;
						case 1:desc='Afiat baik';isMusimKawin=true;break;
						case 2:desc='Segera bercerai (mati)';break;
						case 3:desc='Berkelahi';break;
						case 4:desc='Dukacita kemudian cerai';break;
						case 5:desc='Mendapat harta';isMusimKawin=true;break;
						case 6:desc='Mendapat anak';isMusimKawin=true;break;
						case 7:desc='Amat baik dan nikmat';isMusimKawin=true;break;
						case 8:desc="Dapat anak durhaka pada Allah Ta'ala";break;
						case 9:desc='Papa';break;
						case 10:desc='Kesakitan';break;
						case 11:desc='Amat baik dan baik segera yang dibuat';isMusimKawin=true
					}
					if(phmonth!= hmonth){
						isLegendBolehKawin=false;
						isLegendDilarangKawin=false;
						phmonth=hmonth
					}
					if(isMusimKawin){
						if(!isStyled){
							grid.className+=' w3-green';
							if(!isLegendBolehKawin){
								createLegend('w3-pale-green w3-border-green',(isHijr?desc:'Mulai '+pdate+' '+gdate.getMonthName()+': '+desc));
								isLegendBolehKawin=true
							}
						}
					}else{
						if(!isStyled){
							grid.className+=' w3-amber';
							if (!isLegendDilarangKawin) {
								createLegend('w3-pale-yellow w3-border-amber',(isHijr?desc:'Mulai '+pdate+' '+gdate.getMonthName()+': '+desc));
								isLegendDilarangKawin=true
							}
						}
					}
					if(isStyled)grid.title+=', '+desc;
					else{
						grid.title=desc;
						isStyled = true
					}
				}
				else if(evtMode==3){ //payango-bele
					isMusimBangunRumah=false;
					switch(hmonth){
						case 0:desc='Banyak huru-hara';break;
						case 1:desc='Mulia, baik, beroleh nikmat, tiada putus asa, rejeki';isMusimBangunRumah=true;break;
						case 2:desc='Kesukaran, tidak beroleh rejeki, kematian';break;
						case 3:desc='Maha baik, sentosa, sukacita';isMusimBangunRumah=true;break;
						case 4:desc='Maha baik, beroleh rejeki, sejuk';isMusimBangunRumah=true;break;
						case 5:desc='Terlalu jahat, perkelahian, berbantah-bantahan';break;
						case 6:desc='Terlalu jahat, bertikam, berkelahi, kehilangan';break;
						case 7:desc='Maha baik, beroleh rejeki, harta, emas dan perak';isMusimBangunRumah=true;break;
						case 8:desc="Maha baik, beroleh harta, emas dan perak";isMusimBangunRumah=true;break;
						case 9:desc='Jahat, terbakar, kehilangan';break;
						case 10:desc='Sekalian orang kasihan';break;
						case 11:desc='Amat baik, beroleh harta dan hamba sahaya';isMusimBangunRumah=true
					}
					if(phmonth!=hmonth){
						isLegendBolehBangunRumah=false;
						isLegendDilarangBangunRumah=false;
						phmonth=hmonth
					}
					if(isMusimBangunRumah){
						if(!isStyled){
							grid.className+=' w3-green';
							if(!isLegendBolehBangunRumah){
								createLegend('w3-pale-greeen w3-border-green',(isHijr?desc:'Mulai '+pdate+' '+gdate.getMonthName()+': '+desc));
								isLegendBolehBangunRumah=true
							}
						}
					}else{
						if(!isStyled){
							grid.className+=' w3-amber';
							if(!isLegendDilarangBangunRumah){
								createLegend('w3-pale-yellow w3-border-amber',(isHijr?desc:'Mulai '+pdate+' '+gdate.getMonthName()+': '+desc));
								isLegendDilarangBangunRumah=true
							}
						}
					}
					if(isStyled)grid.title+=', '+desc;
					else{
						grid.title=desc;
						isStyled = true
					}
				}
				if(isToday){
					if(actTmoId){window.clearTimeout(actTmoId);actTmoId=null}
					isDispToday=true;
					replaceClass(menuTodayElm,'w3-button w3-ripple','w3-transparent');
					menuTodayElm.disabled=true;
					desc='Hari ini';
					if(isStyled)grid.title+=', '+desc;
					else{
						grid.className+=' w3-dark-grey';
						grid.title=desc;
						isStyled=true
					}
				}
				else if(!isStyled&&i%7==isFri)grid.className+=' w3-text-teal';
				else if(!isStyled&&i%7==isSun)grid.className+=' w3-text-red';
				if(isStyled)grid.className+=' styled'
			}
			pde.innerHTML=Kalmusgo.getDigit(pdate);sde.innerHTML=Kalmusgo.getDigit(sdate)+' '+smsn;pdate++;
			if(pdate>pdim){
				pdate=1;
				dispDate.setMonth(dispDate.getMonth()+1);
				pdim=dispDate.getDayCountInMonth();
				if(isHijr)hmonth=hdate.getMonth();
				else gmonth=gdate.getMonth()
			}
			sdate++;
			if(sdate>sdim){
				sdate=1;getOppsDate().setMonth(getOppsDate().getMonth()+1);
				sdim=getOppsDate().getDayCountInMonth();
				smsn=getOppsDate().getMonthShortName();
				if(isHijr)gmonth=gdate.getMonth();
				else hmonth=hdate.getMonth()
			}gridCtr=++gridCtr%7
		}
		let spacer=createElm('div','w3-cell-row');spacer.style.height='4px';gridsElm.appendChild(spacer);dispDate.setTime(dispTm)
	},
	recreateDates=function(){
		while(legendElm.firstChild)legendElm.removeChild(legendElm.firstChild);
		while(gridsElm.children[1])gridsElm.removeChild(gridsElm.children[1]);
		createDates()
	},
	createLegend=function(color,desc){
		let el=createElm('div','w3-panel w3-leftbar w3-medium '+color,desc);
		legendElm.appendChild(el)
	},
	updCal=function(){updHeader();recreateDates()},
	onDecMonth=function(){gridAni='right';return isRTL?incMonth():decMonth()},
	onIncMonth=function(){gridAni='left';return isRTL?decMonth():incMonth()},
	onDecYear=function(){gridAni='right';return isRTL?incYear():decYear()},
	onIncYear=function(){gridAni='left';return isRTL?decYear():incYear()},
	onClickMenu=function(){
		if(menuWrapElm.className.indexOf('w3-show')==-1){
			menuBtnElm.className+=' w3-light-grey';menuWrapElm.className+=' w3-show'
		}else hideMenu()
	},
	onChgCalMod=function(){kmg.setHijriMode(!isHijr);applyTodayTmout()},
	onFirstDay=function(){
		if(menuFirstDayElm.className.indexOf('expanded')==-1){replaceClass(menuFirstDayElm,'collapsed','expanded');isAccFirstDayOpened=true}
		else{replaceClass(menuFirstDayElm,'expanded','collapsed');isAccFirstDayOpened=false}
	},
	onSelFirstDay=function(ev){
		ev=ev||window.event;let el=ev.target||ev.srcElement;kmg.setFirstDayOfWeek(el.getAttribute('firstday'));applyTodayTmout();
	},
	onEvts=function(ev){
		if(menuEvtsElm.className.indexOf('expanded')==-1){replaceClass(menuEvtsElm,'collapsed','expanded');isAccEvtsOpened=true}
		else{replaceClass(menuEvtsElm,'expanded','collapsed');isAccEvtsOpened=false}
	},
	onSelEvt=function(ev){
		ev=ev||window.event;let el=ev.target||ev.srcElement,ed=Kalmusgo.getVal('events'),ea=parseInt(el.getAttribute('event'));
		replaceClass(el,'w3-button w3-ripple','w3-transparent');
		el.disabled=true;
		switch(ea){
			case 0:case 1:case 2:case 3:
				replaceClass(accEvtsElm.children[evtMode],'w3-transparent','w3-button w3-ripple');
				accEvtsElm.children[evtMode].disabled=false;
				evtMode=ea;
				evtElm.innerHTML=ed[ea];
				if(isJinxedOn)evtElm.innerHTML+='/Lowanga';
				break;
			case 4:
				replaceClass(accEvtsElm.children[5],'w3-transparent','w3-button w3-ripple');
				accEvtsElm.children[5].disabled=false;
				isJinxedOn=true;
				replaceClass(accEvtsElm.children[6],'w3-transparent','w3-button w3-ripple');
				accEvtsElm.children[6].disabled=false;
				if(evtMode<4)evtElm.innerHTML+='/';
				evtElm.innerHTML+='Lowanga';
				break;
			case 5:
				replaceClass(accEvtsElm.children[4],'w3-transparent','w3-button w3-ripple');
				accEvtsElm.children[4].disabled=false;
				isJinxedOn=false;
				if(evtMode>3){
					replaceClass(accEvtsElm.children[6],'w3-button w3-ripple','w3-transparent');
					accEvtsElm.children[6].disabled=true;
					evtElm.innerHTML='';
				}else evtElm.innerHTML=ed[evtMode];
				break;
			case 6:
				if(evtMode<4){
					replaceClass(accEvtsElm.children[evtMode],'w3-transparent','w3-button w3-ripple');
					accEvtsElm.children[evtMode].disabled=false;
				}
				replaceClass(accEvtsElm.children[4],'w3-transparent','w3-button w3-ripple');
				accEvtsElm.children[4].disabled=false;
				replaceClass(accEvtsElm.children[5],'w3-button w3-ripple','w3-transparent');
				accEvtsElm.children[5].disabled=true;
				evtMode=6;
				isJinxedOn=false;
				evtElm.innerHTML='';
				break;
		}gridAni='top';recreateDates()
	},
	onDispToday=function(){kmg.today()},
	onNewTheme=function(){newTheme();applyTheme()},
	onAbout=function(){
		hideMenu();
		aboutTitleElm.innerHTML='Kalender&nbsp;Musim&nbsp;Gorontalo';
		aboutDateElm.innerHTML='Gorontalo,&nbsp;29&nbsp;April&nbsp;2019';
		aboutElm.style.display='block';
		aboutElm.callback=applyTodayTmout;
		if(actTmoId)window.clearTimeout(actTmoId);
		actTmoId=window.setTimeout(function(){
			aboutElm.style.display='none';aboutElm.callback=null;aboutTitleElm.innerHTML=aboutDateElm.innerHTML='';kmg.today()
		},tmout*1000)
	},
	onClose=function(){hideMenu()},
	onRszWdw=function(){
		if(isSmallScreen&&contElm.clientWidth>=520||!isSmallScreen&&contElm.clientWidth<520){
			isSmallScreen=!isSmallScreen;updTodayLbl();recreateWdayTitle()
		}
	},
	hideMenu=function(){
		if(isAccFirstDayOpened)onFirstDay();
		if(isAccEvtsOpened)onEvts();
		replaceClass(menuWrapElm,' w3-show','');
		replaceClass(menuBtnElm,' w3-light-grey','')
	},
	decMonth=function(){dispDate.setMonth(dispDate.getMonth()-1);updCal();applyTodayTmout()},
	incMonth=function(){dispDate.setMonth(dispDate.getMonth()+1);updCal();applyTodayTmout()},
	decYear=function(){dispDate.setFullYear(dispDate.getFullYear()-1);updCal();applyTodayTmout()},
	incYear=function(){dispDate.setFullYear(dispDate.getFullYear()+1);updCal();applyTodayTmout()},
	syncDates=function(){getOppsDate().setTime(dispDate.getTime())},
	getOppsDate=function(){return isHijr?gdate:hdate},
	getFixTime=function(t){t-=tzOffset;return t-t%864e5+36e5+tzOffset},
	getCurTime=function(){return getFixTime(Date.now())},
	beginNewDate=function(){
		let n=Date.now()-tzOffset,t=864e5-n%864e5;
		window.setTimeout(beginNewDate,t);updTodayLbl();
		if(isAutoNewTheme){newTheme();applyTheme()}
		if(isDispToday){isDispToday=false;kmg.today()}
	},
	applyTodayTmout=function(){
		if(actTmoId){window.clearTimeout(actTmoId);actTmoId=null}
		if(!isDispToday)actTmoId=window.setTimeout(kmg.today,tmout*1000)
	},
	newTheme=function(){let ct=Kalmusgo.themes,i;do i=Math.floor(Math.random()*ct.length);while(ct[i]==theme);theme=ct[i]},
	applyTheme=function(){
		headerElm.className=headerElm.className.substring(0,headerElm.className.lastIndexOf('w3-'))+'w3-'+theme
	},
	replaceClass=function(el,dt,sr){el.className=el.className.replace(dt,sr)};
	kmg.attachTo=function(el){if(el.appendChild&&!contElm.parentNode){el.appendChild(contElm);onRszWdw();return true}return false};
	kmg.fireResize=function(){onRszWdw()};
	kmg.getElement=function(){return contElm};
	kmg.resetDate=function(y,m){
		let t=dispDate.getTime();
		dispDate.setFullYear(HijriDate.int(y,dispDate.getFullYear()));
		dispDate.setMonth(HijriDate.int(m,dispDate.getMonth()));
		if(dispDate.getTime()!=t){gridAni='zoom';updCal();return true}
		return false
	};
	kmg.setFirstDayOfWeek=function(f){
		f=HijriDate.int(f,firstDay)%7;
		if(f!=firstDay){
			let el=accFirstDayElm.children[firstDay];
			replaceClass(el,'w3-transparent','w3-button w3-ripple');
			el.disabled=false;firstDay=f;recreateWdayTitle();gridAni='top';recreateDates();return true
		}return false
	};
	kmg.setFullYear=function(y){return kmg.resetDate(y)};
	kmg.setHijriMode=function(h){
		if(typeof h=='boolean'&&h!=isHijr){
			syncDates();dispDate=getOppsDate();isHijr=h;updCalModMenuLbl();updFirstDayMenuLbl();updTodayLbl();recreateWdayTitle();
			if(isDispToday){isDispToday=false;dispDate.setDate(1);kmg.today()}
			else{
				let d=dispDate.getDate();dispDate.setDate(1);
				if(d>15)dispDate.setMonth(dispDate.getMonth()+1);
				gridAni='top';updCal()
			}return true
		}return false
	};
	kmg.setLanguage=function(l){
		let c=Kalmusgo;
		if(typeof l=='string'){
			l=l.toLowerCase();
			if(typeof c.language[l]=='object'&&l!=c.lang){
				c.lang=l;
				replaceClass(gridsElm,' right-to-left','');
				isRTL=c.getVal('isRTL');if(isRTL)gridsElm.className+=' right-to-left';
				gridAni='zoom';updMenuLbl();updCalModMenuLbl();updFirstDayMenuLbl();updTodayLbl();updHeader();
				recreateWdayTitle();recreateDates();return true
			}
		}return false
	};
	kmg.setMonth=function(m){return kmg.resetDate(null,m)};
	kmg.setTheme=function(t){
		let ct=Kalmusgo.themes,ctl=ct.length,i=0;
		if(typeof t=='number'){
			if(0<=t&&t<ctl){isAutoNewTheme=false;theme=ct[t]}
			else{isAutoNewTheme=true;newTheme()}
		}else if(typeof t=='string'){
			t=t.toLowerCase();
			for(;i<ctl;i++)if(ct[i]==t)break;
			if(i<ctl){isAutoNewTheme=false;theme=ct[i]}
			else{isAutoNewTheme=true;newTheme()}
		}else{isAutoNewTheme=true;newTheme()}
		applyTheme();return isAutoNewTheme
	};
	kmg.setTime=function(t){
		let o=dispDate.getTime();
		dispDate.setTime(getFixTime(HijriDate.int(t,getCurTime())));dispDate.setDate(1);
		if(dispDate.getTime()!=o){gridAni='zoom';updCal();return true}
		return false
	};
	kmg.setTodayTimeout=function(t){t=HijriDate.int(t,tmout);if(t>=10){tmout=t;applyTodayTmout();return true}return false};
	kmg.today=function(){
		if(!isDispToday){dispDate.setTime(getCurTime());dispDate.setDate(1);gridAni='top';updCal();return true}return false
	};
	if(typeof isHijr!='boolean')isHijr=false;
	dispDate=isHijr?hdate:gdate;
	firstDay=HijriDate.int(firstDay,1)%7;
	if(typeof lang=='string'){lang=lang.toLowerCase();if(typeof Kalmusgo.language[lang]!='object')lang='id'}
	else lang='id';
	Kalmusgo.lang=lang;
	kmg.setTheme(theme);
	tmout=HijriDate.int(tmout,120);
	beginNewDate();
	year=HijriDate.int(year,NaN);month=HijriDate.int(month,NaN);
	if(!isNaN(year)&&isNaN(month)){dispDate.setTime(getFixTime(year));dispDate.setDate(1)}
	else{
		dispDate.setTime(getCurTime());dispDate.setDate(1);
		if(!isNaN(year))dispDate.setFullYear(year);
		if(!isNaN(month))dispDate.setMonth(month)
	}createStyle();createAboutModal();createCal();applyTodayTmout()
}
Date.prototype.getMonthName=function(m){
	m=(HijriDate.int(m,this.getMonth())%12+12)%12;
	return Kalmusgo.getVal('monthNames')[m]
};
Date.prototype.getMonthShortName=function(m){
	m=(HijriDate.int(m,this.getMonth())%12+12)%12;
	let c=Kalmusgo.getVal,s=c('monthShortNames');
	return s?s[m]:c('monthNames')[m]
};
Date.prototype.getWeekdayName=function(d){
	d=(HijriDate.int(d,this.getDay())%7+7)%7;
	return Kalmusgo.getVal('weekdayNames')[d]
};
Date.prototype.getWeekdayShortName=function(d){
	d=(HijriDate.int(d,this.getDay())%7+7)%7;
	let c=Kalmusgo.getVal,s=c('weekdayShortNames');
	return s?s[d]:c('weekdayNames')[d]
};
Date.prototype.getYearString=function(y){
	y=HijriDate.int(y,this.getFullYear());
	let e=Kalmusgo.getVal('eraSuffix'),i=0;
	if(e){if(y<1){i++;y=1-y}y=y+' '+e[i]}else y=y.toString();return y
};
Date.prototype.todayShortString=function(){
	let t=this.getTime();this.setTime(Date.now());
	let s=this.getWeekdayShortName()+', '+this.getDate()+' '+this.getMonthShortName()+' '+this.getFullYear();
	this.setTime(t);return Kalmusgo.getDigit(s)
};
Date.prototype.todayString=function(){
	let t=this.getTime();this.setTime(Date.now());
	let	s=this.getWeekdayName()+', '+this.getDate()+' '+this.getMonthName()+' '+this.getFullYear();
	this.setTime(t);return Kalmusgo.getDigit(s)
};
HijriDate.prototype.getMonthName=function(m){
	m=(HijriDate.int(m,this.getMonth())%12+12)%12;
	let c=Kalmusgo;
	return c.lang=='en'?HijriDate.monthNames[m]:c.getVal('hMonthNames')[m]
};
HijriDate.prototype.getMonthShortName=function(m){
	m=(HijriDate.int(m,this.getMonth())%12+12)%12;
	let c=Kalmusgo;
	if(c.lang=='en')return HijriDate.monthShortNames[m];
	let cg=c.getVal,s=cg('hMonthShortNames');
	return s?s[m]:cg('hMonthNames')[m]
};
HijriDate.prototype.getWeekdayName=function(d){
	d=(HijriDate.int(d,this.getDay())%7+7)%7;
	let c=Kalmusgo;
	if(c.lang=='en')return HijriDate.weekdayNames[d]
	return c.getVal('weekdayNames')[d]
};
HijriDate.prototype.getWeekdayShortName=function(d){
	d=(HijriDate.int(d,this.getDay())%7+7)%7;
	let c=Kalmusgo;
	if(c.lang=='en')return HijriDate.weekdayShortNames[d]
	let cg=c.getVal,s=cg('weekdayShortNames');
	return s?s[d]:cg('weekdayNames')[d]
};
HijriDate.prototype.getYearString=function(y){
	y=HijriDate.int(y,this.getFullYear());
	let e=Kalmusgo.getVal('hEraSuffix'),i=0;
	if(e){if(y<1){i++;y=1-y}y=y+' '+e[i]}else y=y.toString();return y
};
HijriDate.prototype.todayShortString=function(){
	let t=this.getTime();this.setTime(Date.now());
	let	s=this.getWeekdayShortName()+', '+this.getDate()+' '+this.getMonthShortName()+' '+this.getFullYear();
	this.setTime(t);return Kalmusgo.getDigit(s)
};
HijriDate.prototype.todayString=function(){
	let t=this.getTime();this.setTime(Date.now());
	let	s=this.getWeekdayName()+', '+this.getDate()+' '+this.getMonthName()+' '+this.getFullYear();
	this.setTime(t);return Kalmusgo.getDigit(s)
};
Object.defineProperty(Kalmusgo,'getDigit',{value:function(d){
	let c=Kalmusgo.getVal('digit');
	if(c)return d.toString().replace(/\d(?=[^<>]*(<|$))/g,function($0){return c[$0]});return d
}});
Object.defineProperty(Kalmusgo,'themes',{value:['amber','aqua','black','blue','blue-grey','brown','cyan','dark-grey','deep-orange','deep-purple','green','grey','indigo','khaki','light-blue','light-green','lime','orange','pink','purple','red','teal','yellow']});
Object.defineProperty(Kalmusgo,'lang',{value:'en',writable:true});
Object.defineProperty(Kalmusgo,'getVal',{value:function(key){return Kalmusgo.language[Kalmusgo.lang][key]}});
Kalmusgo.language={id:{
	isRTL:false,
	menuItem0:["Kalender Hijriyah","Kalender Masehi"],
	menuItem1:"Mulai hari",
	menuItem2:"Pilih musim",
	menuItem3:"Hari ini",
	menuItem4:"Tema baru",
	menuItem5:"Tentang",
	menuItem6:"Tutup",
	eraSuffix:["M","SM"],
	hEraSuffix:["H","SH"],
	monthNames:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
	monthShortNames:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
	weekdayNames:["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"],
	weekdayShortNames:["Min","Sen","Sel","Rab","Kam","Jum","Sab"],
	hMonthNames:["Muharam","Safar","Rabi'ul-Awal","Rabi'ul-Akhir","Jumadil-Awal","Jumadil-Akhir","Rajab","Sya'ban","Ramadhan","Syawwal","Zulqa'idah","Zulhijjah"],
	hMonthShortNames:["Muh","Saf","Raw","Rak","Jaw","Jak","Raj","Sya","Ram","Syw","Zuq","Zuh"],
	events:["Musim Tanam","Musim Melaut","Musim Hajatan","Payango Bele","Tampilkan Lowanga","Hilangkan Lowanga","Hilangkan Semua"]
}};
