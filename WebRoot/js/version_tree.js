//����������Ĵ���,���ð汾��崴��->���ݰ汾����֪ʶ����
var _treeVersion = new treeVersion();

//���汾�����������汾���϶��������
function treeVersion() {
    this.currentModel = null;//��ǰģ���ʶ
    this.versionList = new Array();//�û��汾����
    this.allVersionList = new Array();//�û��汾����
    this.resTreeList = new Array();//�û�������Ŀ����

    this.firstKsId = null;//��ѡ�汾���
    this.firstKsName = null;//��ѡ�汾ȫ��	

    this.currKsId = null;//��ǰ�汾���
    this.currKsName = null;//��ǰ�汾����
    this.currentCourseId = null;//Ĭ�Ͽγ̽ڵ�
    this.currentCourseName = null;//Ĭ�Ͽγ�����
    this.currentmfFlag = null;//0,��ͨ�γ�;1,��Ԫ��ϰ;2,����;3,��ĩ
    this.lastClickTreeNode = null;//Ĭ�Ͽγ̽ڵ�
    this.lastClickTreeNodeName = null;//Ĭ�Ͽγ�����
    this.lastClickmfFlag = null;//0,��ͨ�γ�;1,��Ԫ��ϰ;2,����;3,��ĩ


    this.pagesize = null;//��ʾ��Ŀ����
    this.gradeCodesTeacher = null;//��ǰ�꼶��Χ
    this.subjectCodesTeacher = null;//��ǰ��Ŀ��Χ
    this.stageCodeHTeacher = null;//����
    this.currentTerm = null;//��ǰѧ��
    this.currentGrade = null;//��ǰ�꼶
    this.currentSubject = null;//��ǰ��Ŀ
    this.currentSubjectName = null;//��ǰ��Ŀ
    this.currentSection = null;//��ǰѧ��
    this.currentVersion = null;//��ǰ�汾
    this.currentBookOptionCode = null;//ѡ��/����id
    this.currentBookId = null;//��ǰ�̲ĵ�bookid
    this.currentClassHourId = null;//��ǰ��ʱID
    this.currentClassHourName = null;//��ǰ��ʱ����

    this.bookIds = new Array();//bookid�ַ���
    this.currBookIds = new Array();//��ǰbookID����
    this.url = pls_config_all["TMS.601"];//��ǰ��Դ��ַ
    this.callback = null;
    this.excludeModel = ",bdzy,kszt,xbzy,tzzy,mswk";//

    this.viewHeightMove = 0;//Ԥ���߶�ƫ��(-60)
    this.unitTreePageSize = 8;//Ŀ¼��һҳ��ʾ�ĸ���
    this.unitTreeCurrentPage = 1;//Ŀ¼���ĵ�ǰҳ��
    this.isNewVersion = false;//�Ƿ�δ�����汾�������Ĭ��ѡ�е�һ�½�
}

//��ڷ���,tmodel��ǰģ���ʶ�����ݴ˱�ʶ���ö�Ӧ�Ҳ������Դ��ȡ��չʾ����
treeVersion.prototype.showSubMenu = function (tmodel) {
    this.pagesize = _pMain.menupagesize - 1;//��ʾ��Ŀ����
    this.pagesize = 11;//�γ���Ŀ���̶�

    //��¼��ǰģ���ʶ(�������γ����ò˵�)
    if (typeof (tmodel) != "undefined" && tmodel != null && tmodel.length > 0) {
        this.currentModel = tmodel;
    }
    eval(_treeVersion.currentModel + ".getRes('" + _treeVersion.currentCourseId + "','" + _treeVersion.currentCourseName + "');");
}

//��ȡ�û��汾��Ŀ¼��Ϣ
treeVersion.prototype.getUserVersion = function () {
    var url = transferProtocol_web + _config["SSO"] + "/sso/interface/queryVersion.jsp?queryType=userVersionProgressSetLast&username=" + teachernumber;
    ajaxJson(url, null, "gbk", _treeVersion.setUserVersionByJson);
}

//����ͷ���û��꼶-ѧ��-ѧ��-�汾
treeVersion.prototype.setUserVersionByJson = function (data) {
    if (data.book != '' && data.book != null) {
        _treeVersion.currentTerm = data.book.termCode;
        _treeVersion.currentGrade = data.book.gradeCode;
        _treeVersion.currentSubject = data.book.subjectCode;
        _treeVersion.currentSection = data.book.studyStageCode;
        _treeVersion.currentBookOptionCode = data.book.bookOptionCode;
        _treeVersion.currentVersion = data.book.versionCode;
        _treeVersion.currentBookId = data.book.bookId;
        _treeVersion.currentSubjectName = data.book.subject;
        var subjectName = data.book.subject;
        var gradeName = data.book.grade;
        var termName = data.book.term;
        var versionName = data.book.version;
        if (data.book.studyStageCode == '0003') {
            var str = data.book.studyStage + ' &bull; ' + subjectName + ' &bull; ' + versionName + ' &bull; ' + data.book.bookOptionName;
        } else {
            var str = gradeName + ' &bull; ' + termName + ' &bull;  ' + subjectName + ' &bull; ' + versionName;
        }
        $('#userVersionInfo').html(str);
        _treeVersion.getUserLastCourse();
    }
}

//��ȡ�γ̽���
treeVersion.prototype.getUserLastCourse = function () {
    var url = transferProtocol_web + _config["PLS"] + '/youjiao2/getLastCourseSetP.do?module=bk&userName=' + teachernumber + '&bookId=' + _treeVersion.currentBookId;
    ajaxJson(url, null, "gbk", _treeVersion.setUserLastCourseByJson);
}

treeVersion.prototype.setUserLastCourseByJson = function (data) {
//console.log(data);
    if (data.flag == 1) {
        if (!_common.isBlank(data.item.ksId)) {
            if (data.item.ksId == "null") {
                _treeVersion.isNewVersion = true;
            } else {
                _treeVersion.currentCourseId = data.item.ksId;
                //�жϿγ̽����Ƿ��ǿ�ʱ
                if (!_common.isBlank(data.item.classHourId)) {
                    _treeVersion.currentClassHourId = data.item.classHourId;
                } else {
                    _treeVersion.currentClassHourId = null;
                    _treeVersion.currentClassHourName = null;
                }
                _treeVersion.isNewVersion = false;
            }
        } else {
            _treeVersion.isNewVersion = true;
        }
    } else {
        //�����İ汾��û�������½�,Ĭ��ѡ�е�һ�½�
        _treeVersion.isNewVersion = true;
    }
    _treeVersion.showUnitTree(_treeVersion.currentSection, _treeVersion.currentGrade, _treeVersion.currentTerm, _treeVersion.currentSubject, _treeVersion.currentVersion, _treeVersion.currentBookOptionCode);
}

//չʾĿ¼��
treeVersion.prototype.showUnitTree = function (section, grade, volume, subject, versions, BookOptionCode) {
    if (section == '0003') {
        var url = transferProtocol_web + _config["PLS"] + "/youjiao/baceContent.do?section=" + section + "&rxiu=" + BookOptionCode + "&subject=" + subject + "&versions=" + versions + "&listType=1&classHour=1";
    } else {
        var url = transferProtocol_web + _config["PLS"] + "/youjiao/baceContent.do?section=" + section + "&grade=" + grade + "&volume=" + volume + "&subject=" + subject + "&versions=" + versions + "&listType=1&classHour=1";
    }
    //var url='http://llzvcom.czbanbantong.com/psl/youjiao/baceContent.do?section=0001&grade=0001&volume=0001&subject=0001&versions=0001&listType=1&classHour=0';
    ajaxJson(url, null, "gbk", _treeVersion.setUserUnitTreeByJson);
}

treeVersion.prototype.setUserUnitTreeByJson = function (data) {
//console.log(data);
    var h = '';
    if (data.classes != '' && data.classes != null) {
        var index = 0;//ͳ��Ŀ¼����������Ԫ+�ǵ�Ԫ��
        var index_class = 0;//ͳ��Ŀ¼����������Ԫ+�ǵ�Ԫ+��ʱ��
        $.each(data.classes, function (k, v) {
            if (k == 0) {
                _treeVersion.currKsId = v.code;
                _treeVersion.currKsName = v.name;
                return;
            }
            index++;
            index_class++;
            var mfFlag;
            _common.isBlank(v.mfFlag) ? mfFlag = 0 : mfFlag = v.mfFlag;
            var click = "_treeVersion.clickTreeNode('" + v.code + "','" + v.name + "','" + mfFlag + "',this);";

            if (v.isUnit == 1) {
                //�ǵ�Ԫ	
                var str = '<h4>' + v.name + '</h4>';
                h += '<li class="unit"><a title="' + v.name + '">' + str + '</a></li>';
            } else {
                if (_naUtil.selectMenuName == '���ý�ѧ') {
                    //���ý�ѧ��Ŀ
                    if (_treeVersion.isNewVersion) {
                        //�°汾��û�н���
                        //���ý�ѧ��Ŀ��ǰ�γ���ֻ��һ����ʱ
                        _treeVersion.currentCourseId = v.code;
                        _treeVersion.currentCourseName = v.name;
                        if (!_common.isBlank(v.classHours) && v.classHours.length > 0) {
                            _treeVersion.currentClassHourId = v.classHours[0].id;
                            _treeVersion.currentmfFlag = mfFlag;
                            if (v.classHours.length == 1) {
                                _treeVersion.currentClassHourName = null;
                                var str = '<h5 class="cur">' + v.name + '</h5>';
                                _treeVersion.unitTreeCurrentPage = Math.ceil((index) / _treeVersion.unitTreePageSize);
                            } else {
                                _treeVersion.currentClassHourName = v.classHours[0].name;
                                var str = '<h5>' + v.name + '</h5>';
                            }
                            h += '<li class="unit" style="cursor:pointer" ksId="' + v.code + '" classHourId="' + v.classHours[0].id + '" classHourName="' + v.classHours[0].name + '" onclick="' + click + '"><a title="' + v.name + '">' + str + '</a></li>';
                        } else {
                            _treeVersion.currentClassHourName = null;
                            _treeVersion.currentClassHourId = null;
                            _treeVersion.currentmfFlag = mfFlag;
                            var str = '<h5 class="cur">' + v.name + '</h5>';
                            _treeVersion.unitTreeCurrentPage = Math.ceil((index) / _treeVersion.unitTreePageSize);
                            h += '<li class="unit" style="cursor:pointer" ksId="' + v.code + '" classHourId="" classHourName="" onclick="' + click + '"><a title="' + v.name + '">' + str + '</a></li>';
                        }
                        _treeVersion.isNewVersion = false;
                    } else {
                        //�ϰ汾
                        if (_treeVersion.currentCourseId == v.code) {
                            _treeVersion.currentCourseId = v.code;
                            _treeVersion.currentCourseName = v.name;
                            _treeVersion.currentmfFlag = mfFlag;
                            if (!_common.isBlank(v.classHours) && v.classHours.length > 0) {
                                //�п�ʱ    						
                                if (v.classHours.length == 1) {
                                    _treeVersion.currentClassHourName = null;
                                    _treeVersion.currentClassHourId = v.classHours[0].id;
                                    var str = '<h5 class="cur">' + v.name + '</h5>';
                                    //h += '<li class="unit" classHourId="'+v.classHours[0].id+'" classHourName="'+v.classHours[0].name+'" onclick="'+click+'"><a title="'+v.name+'">'+str+'</a></li>';
                                    _treeVersion.unitTreeCurrentPage = Math.ceil((index) / _treeVersion.unitTreePageSize);
                                } else {
                                    var str = '<h5>' + v.name + '</h5>';
                                    //h += '<li class="unit"><a title="'+v.name+'">'+str+'</a></li>';	
                                }
                                h += '<li class="unit" style="cursor:pointer" ksId="' + v.code + '" classHourId="' + v.classHours[0].id + '" classHourName="' + v.classHours[0].name + '" onclick="' + click + '"><a title="' + v.name + '">' + str + '</a></li>';
                            } else {
                                //û�п�ʱ
                                _treeVersion.currentClassHourName = null;
                                _treeVersion.currentClassHourId = null;
                                _treeVersion.currentmfFlag = mfFlag;
                                var str = '<h5 class="cur">' + v.name + '</h5>';
                                h += '<li class="unit" style="cursor:pointer" ksId="' + v.code + '" classHourId="" classHourName="" onclick="' + click + '"><a title="' + v.name + '">' + str + '</a></li>';
                                //h += '<li class="unit"><a title="'+v.name+'">'+str+'</a></li>';	
                                _treeVersion.unitTreeCurrentPage = Math.ceil((index) / _treeVersion.unitTreePageSize);
                            }
                        } else {
                            var str = '<h5>' + v.name + '</h5>';
                            if (!_common.isBlank(v.classHours)) {
                                if (v.classHours.length > 0) {
                                    var str = '<h5>' + v.name + '</h5>';
                                    h += '<li class="unit" style="cursor:pointer" ksId="' + v.code + '" classHourId="' + v.classHours[0].id + '" classHourName="' + v.classHours[0].name + '" onclick="' + click + '"><a title="' + v.name + '">' + str + '</a></li>';
                                } else {
                                    var str = '<h5>' + v.name + '</h5>';
                                    h += '<li class="unit" style="cursor:pointer" ksId="' + v.code + '" classHourId="" classHourName=""  onclick="' + click + '"><a title="' + v.name + '">' + str + '</a></li>';
                                }
                            } else {
                                var str = '<h5>' + v.name + '</h5>';
                                h += '<li class="unit" style="cursor:pointer" ksId="' + v.code + '" classHourId="" classHourName=""  onclick="' + click + '"><a title="' + v.name + '">' + str + '</a></li>';
                            }
                        }
                    }
                    //ѭ����ʱ�б�(����������ʱ)
                    if (!_common.isBlank(v.classHours) && v.classHours.length > 1 && v.isUnit == 0) {
                        $.each(v.classHours, function (kk, vv) {
                            index++;
                            if (_treeVersion.currentCourseId == v.code) {
                                if (vv.id == _treeVersion.currentClassHourId || _common.isBlank(_treeVersion.currentClassHourId)) {
                                    _treeVersion.currentClassHourName = vv.name;
                                    _treeVersion.currentClassHourId = vv.id;
                                    var str = '<h6 class="cur">' + vv.name + '</h6>';
                                    _treeVersion.isNewVersion = false;
                                    _treeVersion.unitTreeCurrentPage = Math.ceil((index) / _treeVersion.unitTreePageSize);
                                } else {
                                    var str = '<h6>' + vv.name + '</h6>';
                                }
                            } else {
                                var str = '<h6>' + vv.name + '</h6>';
                            }
                            h += '<li class="unit" style="cursor:pointer" classHourId="' + vv.id + '" classHourName="' + vv.name + '" onclick="' + click + '"><a title="' + vv.name + '">' + str + '</a></li>';
                        })
                    }
                } else {
                    //������Ŀ
                    if (_treeVersion.isNewVersion) {
                        //�°汾��û�н���
                        var str = '<h5 class="cur">' + v.name + '</h5>';
                        _treeVersion.currentCourseId = v.code;
                        _treeVersion.currentCourseName = v.name;
                        _treeVersion.currentmfFlag = mfFlag;
                        _treeVersion.isNewVersion = false;
                        _treeVersion.unitTreeCurrentPage = Math.ceil((index) / _treeVersion.unitTreePageSize);
                        _treeVersion.addLastCourse();
                    } else {
                        if (_treeVersion.currentCourseId == v.code) {
                            var str = '<h5 class="cur">' + v.name + '</h5>';
                            _treeVersion.currentCourseId = v.code;
                            _treeVersion.currentCourseName = v.name;
                            _treeVersion.currentmfFlag = mfFlag;
                            _treeVersion.unitTreeCurrentPage = Math.ceil((index) / _treeVersion.unitTreePageSize);
                        } else {
                            var str = '<h5>' + v.name + '</h5>';
                        }
                    }
                    /**
                     if(!_common.isBlank(v.classHours)&&v.classHours.length>0){
						_treeVersion.currentClassHourName = v.classHours[0].name;
						_treeVersion.currentClassHourId = v.classHours[0].id;
						h += '<li class="unit" classHourId="'+v.classHours[0].id+'" classHourName="'+v.classHours[0].name+'" onclick="'+click+'"><a title="'+v.name+'">'+str+'</a></li>';
   					}else{
   						h += '<li class="unit" classHourId="" classHourName="" onclick="'+click+'"><a title="'+v.name+'">'+str+'</a></li>';
   					}
                     */
                    h += '<li class="unit" style="cursor:pointer" ksId="' + v.code + '" onclick="' + click + '"><a title="' + v.name + '">' + str + '</a></li>';
                }
            }
        })

        /**
         h += '<li class="pphs">';
         h += '<span class="pos-lr">';
         h += '<button class="yuan left cur" onclick="_treeVersion.changePage(1,event);"></button>';
         h += '<button class="yuan right cur" onclick="_treeVersion.changePage(2,event);"></button>';
         h += '</span>';
         var userVersionInfo = $('#userVersionInfo').html();
         h += '<h3 class="more-xk" onclick="_treeVersion.showVersionLittle(event);"><span class="fr"><i class="ico-up"></i></span>'+_common.cutStr(userVersionInfo,23,'',true)+'</h3>';
         h += '</li>';
         $('.pos-list02').html(h);

         //���½ڼ�¼������û�п�ʱ��¼�ģ���Ĭ���½ڼ�¼����һ����ʱ��¼
         //if(_naUtil.selectMenuName=='���ý�ѧ'&&!isCheckFlag){
		//	$('.pos-list02').find('li').eq(currentUnitIndex+1).find('h6').addClass('cur');
		//	_treeVersion.unitTreeCurrentPage = Math.ceil((currentUnitIndex+1)/_treeVersion.unitTreePageSize);
		//	_treeVersion.currentClassHourName = $('.pos-list02').find('li').eq(currentUnitIndex+1).find('h6').html();
		//	_treeVersion.currentClassHourId = $('.pos-list02').find('li').eq(currentUnitIndex+1).attr('classHourId');
		//}

         _treeVersion.showMenuInfo();
         //չʾѡ��Ŀ¼����Դ
         if(!_common.isBlank(_treeVersion.currentModel)){
			_treeVersion.showSubMenu(_treeVersion.currentModel);
		}

         //������һ�ε�����½����ڵ�ҳ��
         _treeVersion.splitUnitTree(_treeVersion.unitTreeCurrentPage,_treeVersion.unitTreePageSize);
         if(_naUtil.isFirstLoad){
			_naUtil.isFirstLoad = false;
			$('#openXk').click();
		}
         */
    } else {
        //û���½�Ŀ¼
        _treeVersion.currentCourseName = '';
    }

    h += '<li class="pphs">';
    h += '<span class="pos-lr">';
    h += '<button class="yuan left cur"  onclick="_treeVersion.changePage(1,event);"></button>';
    h += '<button class="yuan right cur" onclick="_treeVersion.changePage(2,event);"></button>';
    h += '</span>';

    var userVersionInfo = $('#userVersionInfo').html();
    h += '<h3 class="more-xk" onclick="_treeVersion.showVersionMore(event);"><span style="cursor:pointer;" class="fr"><i class="ico-up"></i></span>' + _common.cutStr(userVersionInfo, 22, '', true) + '</h3>';
    h += '</li>';
    $('.pos-list02').html(h);

    _treeVersion.showMenuInfo();
    //չʾѡ��Ŀ¼����Դ
    if (!_common.isBlank(_treeVersion.currentModel)) {
        _treeVersion.showSubMenu(_treeVersion.currentModel);
    }

    //������һ�ε�����½����ڵ�ҳ��
    _treeVersion.splitUnitTree(_treeVersion.unitTreeCurrentPage, _treeVersion.unitTreePageSize);
    if (_naUtil.isFirstLoad) {
        _naUtil.isFirstLoad = false;
        $('#openXk').click();
    }
}

//��ȡ�û����а汾�б�
treeVersion.prototype.getUserAllVersionList = function () {//���ýӿڻ�ȡ�汾�б�
    var url = transferProtocol_web + _config["TMS"] + "/tms/interface/queryVersion.jsp?queryType=byUser&username=" + teachernumber;
    ajaxJson(url, null, "gbk", function (data) {
        var tmpHtml = '';
        if (data && data.rtnArray && data.rtnArray.length > 0) {
            var userCheckedVersionIndex = -1;//�û�ѡ��İ汾���
            var firstBookId = '';
            $.each(data.rtnArray, function (k, v) {
                if (v.studyStageCode == '0003') {
                    var info = v.studyStage + ' &bull; ' + v.subject + ' &bull; ' + v.version + ' &bull; ' + v.bookOptionName;
                } else {
                    var info = v.grade + ' &bull; ' + v.term + ' &bull; ' + v.subject + ' &bull; ' + v.version;
                }
                firstBookId = v.bookId;
                if (data.seted == v.bookId) {
                    userCheckedVersionIndex = k;
                    tmpHtml += '<li style="cursor:pointer;" onclick="_treeVersion.changeVersion(\'' + v.bookId + '\',this);" class="cur">' + info + '</li>';
                } else {
                    tmpHtml += '<li style="cursor:pointer;" onclick="_treeVersion.changeVersion(\'' + v.bookId + '\',this);">' + info + '</li>';
                }
            })

            //tmpHtml += '<LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI>';
            //tmpHtml += '<LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI><LI class=cur style="CURSOR: pointer">һ�꼶 ��ѧ������ �̰�</LI>';
            $('ul.more-xxk div.pad10').find('li').remove();
            $('ul.more-xxk div.pad10').append(tmpHtml);
            if (userCheckedVersionIndex != -1) {
                $('ul.more-xxk div.pad10').find('li').eq(userCheckedVersionIndex).addClass('cur');
                _treeVersion.setVersionAndGetInfo(data.seted);
            } else {
                //�汾�б�û���û�ѡ��İ汾��Ĭ�ϵ�һ��
                $('ul.more-xxk div.pad10').find('li').eq(0).addClass('cur');
                //���õ�һ��Ϊ��ǰ�汾
                _treeVersion.setVersionAndGetInfo(firstBookId);
            }
        }
    });
}

//���ð汾����ȡ��ǰ�汾����Ϣ
treeVersion.prototype.setVersionAndGetInfo = function (bookId) {
    var url = transferProtocol_web + _config["TMS"] + '/tms/interface/queryVersion.jsp?queryType=userVersionProgressSet&username=' + teachernumber + '&bookId=' + bookId;
    ajaxJson(url, null, "gbk", function (data) {
        _treeVersion.getUserVersion();
    });
}

treeVersion.prototype.getUserHeadPhoto = function () {
    var url = transferProtocol_web + _config["TMS"] + '/tms/interface/queryTeacher.jsp?queryType=byNames&usernames=' + teachernumber;
    ajaxJson(url, null, "gbk", function (data) {
        if (data && data.result && data.rtnArray.length > 0) {
            if (!_common.isBlank(data.rtnArray[0].headPhoto)) {
                var headphoto = transferProtocol_web + _config["VFS"] + "/tms/" + data.rtnArray[0].headPhoto;
                $('#headphoto').attr('src', headphoto);
            }
        }
    });
}
//�л��汾
treeVersion.prototype.changeVersion = function (bookId, obj) {
    _treeVersion.unitTreeCurrentPage = 1;
    $('ul.more-xxk').find('li').removeClass('cur');
    $(obj).addClass('cur');
    _treeVersion.setVersionAndGetInfo(bookId);
}

//չʾ�����汾
treeVersion.prototype.showVersionLittle = function (event) {
    stopPropagation(event);
    $('.more-xxk').stop().animate({'height': '145px'});
    $('.zd-more').children('i').removeClass('ico-down').addClass('ico-up');
    $('.pos-list02').hide();
}

//չʾȫ���汾
treeVersion.prototype.showVersionMore = function (event) {
    stopPropagation(event);
    $('.pos-list02').hide();
    //��̬��߶ȣ�ȡ����
    var height = $('#versionHeight').height();
    height = height + 8;
    if (height > 440) {
        height = 440;
    }
    if ($('.zd-more').children('i').hasClass('ico-up')) {
        $('.more-xxk').stop().animate({'height': height + 'px'});//440px��Ϊ��̬��ȡ
        $('.zd-more').children('i').removeClass('ico-up').addClass('ico-down');
    } else {
        _naUtil.hideBg();
    }
}

//�����϶��½ڿ�ʱ��Ϣ
treeVersion.prototype.showMenuInfo = function () {
    _common.isBlank(_naUtil.selectMenuName) ? _naUtil.selectMenuName = '' : _naUtil.selectMenuName;
    _common.isBlank(_treeVersion.currentCourseName) ? _treeVersion.currentCourseName = '' : _treeVersion.currentCourseName;
    var menuHtml = _naUtil.selectMenuName;
    if (_treeVersion.currentCourseName != '') {
        menuHtml += ' > �γ̣�' + _treeVersion.currentCourseName;
    }
    if (_naUtil.selectMenuName == '���ý�ѧ') {
        if (!_common.isBlank(_treeVersion.currentClassHourName) && _treeVersion.currentClassHourName != 'null') {
            menuHtml += ' > ��ʱ��' + _treeVersion.currentClassHourName;
        }
    }
    //д���ڿζ˵�ǰ��ʱID
    initDTQ(1);
    $('.jieduan').html(menuHtml);
}

//Ŀ¼��ҳ
treeVersion.prototype.changePage = function (type, event) {
    stopPropagation(event);
    //type:1��һҳ 2��һҳ
    if (type == 1) {
        if (_treeVersion.unitTreeCurrentPage == 1) {
            return false;
        }
        _treeVersion.unitTreeCurrentPage--;
        _treeVersion.splitUnitTree(_treeVersion.unitTreeCurrentPage, _treeVersion.unitTreePageSize);
    } else {
        if (_naUtil.selectMenuName == '���ý�ѧ') {
            var pageTotal = Math.ceil($('ul.pos-list02 li.unit').length / _treeVersion.unitTreePageSize);
        } else {
            var pageTotal = Math.ceil($('ul.pos-list02 li.unit').length / _treeVersion.unitTreePageSize);
        }

        if (_treeVersion.unitTreeCurrentPage == pageTotal) {
            return false;
        }
        _treeVersion.unitTreeCurrentPage++;
        _treeVersion.splitUnitTree(_treeVersion.unitTreeCurrentPage, _treeVersion.unitTreePageSize);
    }
}

//Ŀ¼����ҳ
treeVersion.prototype.splitUnitTree = function (pagenum, pagesize) {
    var istart = pagesize * (pagenum - 1);
    var iend = pagesize * pagenum;

    var pageTotal = Math.ceil($('ul.pos-list02 li.unit').length / pagesize);
    $('ul.pos-list02 li.unit').each(function (num) {
        if (num < istart || num >= iend) {
            $(this).hide();
        } else {
            $(this).show();
        }
    })
    /**
     if(_naUtil.selectMenuName=='���ý�ѧ'){
		//��ʾ��ʱ��Ϣ
		$('ul.pos-list02 li.classhour').show();	
		var pageTotal = Math.ceil($('ul.pos-list02 li.unit').length/pagesize);
	   $('ul.pos-list02 li.unit').each(function(num){
	       if(num<istart || num>=iend)
	       {
	           $(this).hide();
	       }else{
	       	   $(this).show();
	       }
	   })		
	}else{
		//��չʾ��ʱ��Ϣ
		var pageTotal = Math.ceil($('ul.pos-list02 li.putong').length/pagesize);
	   $('ul.pos-list02 li.putong').each(function(num){
	       if(num<istart || num>=iend)
	       {
	           $(this).hide();
	       }else{
	       	   $(this).show();
	       }
	   })
	   $('ul.pos-list02 li.classhour').hide();		
	}
     */


    if (pagenum <= 1) {
        $('button.left').removeClass('cur');
    } else {
        $('button.left').addClass('cur');
    }

    if (pagenum >= pageTotal) {
        $('button.right').removeClass('cur');
    } else {
        $('button.right').addClass('cur');
    }
}


//������ɾ�汾ҳ��
treeVersion.prototype.showVersionPageBak = function () {
    stopPropagation(event);
    $('.more-xxk').stop().animate({'height': '0px'});
    $('.zd-more').children('i').removeClass('ico-down').addClass('ico-up');
    var url = transferProtocol_web + _config["TMS"] + "/tms/itms/showUserVer.do";
    var dialog = art.dialog.open(url,
        {
            title: '����/ɾ����ѡ�汾',
            lock: true,
            top: 25,
            width: 650,
            height: 500,
            padding: 0,
            margin: 0,
            close: closeOkButtonFunction,
            button: [{
                name: '�ر�',

                callback: function () {
                }
            }]
        });
}

treeVersion.prototype.showVersionPage = function () {
    stopPropagation(event);
    $('#openXk').find('a').eq(0).removeClass('cur');
    $('.more-xxk').stop().animate({'height': '0px'});
    $('.zd-more').children('i').removeClass('ico-down').addClass('ico-up');
    var url = transferProtocol_web + _config["TMS"] + "/tms/itms/showUserVer.do";
    var top = document.body.clientHeight - 600;
    document.getElementById('versionPageUrl').src = url;
    art.dialog({
        margin: 0,
        padding: 0,
        title: '����/ɾ����ѡ�汾',
        width: 650,
        //height:530,
        content: document.getElementById('versionPage'),
        lock: true,
        top: top,
        opacity: 0.2,
        close: closeOkButtonFunction,
        button: [{
            name: '�ر�',

            callback: function () {
            }
        }]
    });
}

//���Ӻ����ð汾�ص�������
//�رհ汾ѡ��ҳ�������ˢ��Ŀ¼
function closeOkButtonFunction() {
    _treeVersion.getUserAllVersionList();
    _naUtil.hideBg();
}

//��ȡ���п��ð汾
treeVersion.prototype.setAllVersionList = function () {//���ýӿڻ�ȡ�汾�б�
    var data = "queryType=byUser&username=" + teachernumber + "&schoolId=" + schoolId + "&studyStages=" + schoolStage + "&realSet=1";
    ajaxJson(_treeVersion.url, data, "gbk", _treeVersion.setAllVersionListByJson);
}
//�������а汾�б�
treeVersion.prototype.setAllVersionListByJson = function (rdate) {
    _treeVersion.allVersionList.length = 0;//�������
    _treeVersion.currBookIds.length = 0;

    var currList = rdate.rtnArray;
    for (i = 0; i < currList.length; i++) {
        var userSetNode = currList[i];
        var termName = userSetNode.term;//ѧ��
        var termCode = userSetNode.termCode;

        var subjectId = userSetNode.subjectCode;//��Ŀ
        var subjectName = userSetNode.subject;

        var stageCode = userSetNode.studyStageCode;//ѧ��  Сѧ ���� ����
        var stageName = userSetNode.studyStage;

        var gradeId = userSetNode.gradeCode;//�꼶
        var gradeName = userSetNode.grade;//�꼶����

        var bookId = userSetNode.bookId;
        var bookOptionName = userSetNode.bookOptionName

        _treeVersion.currBookIds.push(bookId);
        var ksId = userSetNode.ksId;

        var ksName = userSetNode.ksName;//ȫ��
        var ksTrueName = userSetNode.version;//������

        if (stageCode == "0003") ksName = subjectName + "|" + stageName + "." + ksTrueName + "." + bookOptionName;
        else ksName += subjectName + "|" + gradeName + "." + termName + "." + ksTrueName;
        _treeVersion.allVersionList[i] = new userSetObj(termName, termCode, subjectId, subjectName, stageCode, stageName, gradeId, bookId, ksId, ksName, ksTrueName);
    }
}
//�����汾ѡ�����
treeVersion.prototype.setVersionList = function (callback) {//���ýӿڻ�ȡ�汾�б�

    _treeVersion.callback = callback;
    _treeVersion.setAllVersionList();
    var url = transferProtocol_web + _config["PLS"] + "/newteach/getUserSetBySubjectName.do?subjectName=" + "";
    url += '&ajaxdate=' + new Date() + '&username=' + teachernumber + "&schoolId=" + schoolId + "&studyStages=" + schoolStage;
    ajaxJson(url, null, "gbk", _treeVersion.setVersionListByJson);
}
//������壨�����ã�
treeVersion.prototype.setVersionListByJson = function (rdate) {
    _treeVersion.versionList.length = 0;//�������

    if (!rdate.length > 0) {
        _treeVersion.addVersionStage();
        return;
    }
    for (i = 0; i < rdate.length; i++) {
        var userSetNode = rdate[i];
        var termName = userSetNode.termName;
        var termCode = userSetNode.termCode;
        var subjectId = userSetNode.subjectCode;
        var subjectName = userSetNode.subjectName;
        var stageCode = userSetNode.stageCode;
        var stageName = userSetNode.stageName;
        var gradeId = userSetNode.gradeId;
        var bookId = userSetNode.bookId;
        var ksId = userSetNode.ksId;
        var ksName = userSetNode.ksName;
        var ksTrueName = userSetNode.ksTrueName;
        _treeVersion.versionList[i] = new userSetObj(termName, termCode, subjectId, subjectName, stageCode, stageName, gradeId, bookId, ksId, ksName, ksTrueName);
        if (0 == i) {
            _treeVersion.firstKsId = ksId;
            _treeVersion.firstKsName = ksName;
            _treeVersion.currKsId = ksId;
            _treeVersion.currKsName = ksName;
        }
        if (ksId == currVersionid) {
            _treeVersion.currKsId = currVersionid;
            _treeVersion.currKsName = ksName;
        }
    }//end of for
     //
    var currList = null, title = "", page = "";
    var courseList = "<ul class='classSet'>";
    var sp = document.getElementById("selectPanel"), h = "";
    sp.innerHTML = ""
    var listValue = _treeVersion.currKsId;
    //title="��ѡ��ǰ�汾                ��ѡ��ǰ�γ�";

    currList = _treeVersion.versionList;

    for (var i = 0; i < currList.length; i++) {
        var item = currList[i];
        var ksName = item.ksName;
        var ksId = item.ksId;
        var gradeId = item.gradeId;
        var subjectId = item.subjectId;
        var subjectName = item.subjectName;

        if (ksName == _treeVersion.currKsName) {
            courseList += "<li style='width:300px'><LABEL><input name='sel' onclick='_treeVersion.setResTreeList();' type='radio' value=" + ksName + " ksId=" + ksId + " subjectId=" + subjectId + " subjectName=" + subjectName + " gradeId=" + gradeId + " checked='checked' />" + ksName + "</LABEL></li>";

        } else {
            courseList += "<li style='width:300px'><LABEL><input name='sel' onclick='_treeVersion.setResTreeList();' type='radio' value=" + ksName + " ksId=" + ksId + " subjectId=" + subjectId + " subjectName=" + subjectName + " gradeId=" + gradeId + " />" + ksName + "</LABEL></li>";
        }
    }

    //��ʾ�汾�б�
    courseList += "</ul>";
    var sel = $("#menu").children().find(".sel");
    if (sel.length > 0) {
        page += "<div class=pageNext id='courseClose'><a style='margin-top: 4px;' href='javascript:void(_treeVersion.closePanel());'>�� ��</a></div>";
    }
    page += "<div class=pageNext><a style='margin-top: 4px;' onclick='_treeVersion.saveVersion();_treeVersion.saveCourse()' >ȷ ��</a></div>";

    page += "<div class='pageNext bxBtn'><a style='float:left;margin-top: 4px;' href='javascript:void(_treeVersion.setDeletePanel())'>ɾ����ѡ�汾</a></div>";
    page += "<div class='pageNext bxBtn'><a style='float:left;margin-top: 4px;' href='javascript:void(_treeVersion.addVersionStage())'>���ӱ�ѡ�汾</a></div>";

    h += "<div class=divTop id=divTop style='height:" + (540 + _treeVersion.viewHeightMove) + "px'>";
    h += "<div class=divClose onclick='_treeVersion.closePanel();'></div>";
    h += "<div class=divTitle>�γ�����</div>";
    h += "<div class=divContent style='overflow:visible'>";
    h += "<H3>��ѡ��ǰ�汾������������ѡ��ǰ�γ�</H3>"
    h += "<div id='version_tips' style='height:40px;color:#ba0505;display=none' align='center'></div>"


    h += "<DIV id=sp class='sp' style='OVERFLOW: auto; HEIGHT: 340px; width:320px; float:left;overflow-x: hidden;' align=left>" + courseList + "</div>";
    var courseDiv = "<DIV id='courseDiv' class='courseDiv sp' style='HEIGHT: 340px; width:320px; overflow:scroll; overflow-x: hidden;'></div>";

    h += courseDiv;

    h += "<div class=page>" + page + "</div></div></div>";
    h += "<div class=divBottom></div>";
    sp.innerHTML = h;
    sp.style.display = document.getElementById("maskAll").style.display = 'block';

    if (currList.length == 0) {
        document.getElementById("version_tips").style.display = '';
        document.getElementById("version_tips").innerHTML = "����ӱ�ѡ�汾��";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("version_tips").style.display = 'none';
        $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
    }

    return _treeVersion.callback();
}

//��������������
treeVersion.prototype.setResTreeList = function () {
    var sel = document.getElementsByName("sel"), i = 0;
    if (sel.length == 0) {
        document.getElementById("version_tips").style.display = '';
        document.getElementById("version_tips").innerHTML = "��δ���õ�ǰ�γ�!";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("version_tips").style.display = 'none';
        $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
    }
    for (var i = 0; i < sel.length; i++) {
        if (sel[i].checked) {
            _treeVersion.currKsName = sel[i].value;
            _treeVersion.currKsId = sel[i].ksId;
            _treeVersion.currentGrade = sel[i].gradeId;
            _treeVersion.currentSubject = sel[i].subjectId;
            _treeVersion.currentSubjectName = sel[i].subjectName;
            break;
        }
    }
    var url = transferProtocol_web + _config["PLS"] + "/teach/getResTree.do?subjectName=" + "";
    url += '&ksId=' + _treeVersion.currKsId + "&username=" + teachernumber;
    url += '&ajaxdate=' + new Date();
    sendRequest(_treeVersion.setResTreeListByXML, url, "post");
}
//�����γ�����
treeVersion.prototype.setResTreeListByXML = function (xmldoc) {
    _treeVersion.resTreeList.length = 0;
    if (xmldoc != null) {
        var treeNodes = xmldoc.selectNodes("//VCOM/treeNodes/treeNode");
        for (var i = 0; i < treeNodes.length; i++) {
            var treeNode = treeNodes[i];
            var treeNodeName = treeNode.selectNodes("treeNodeName")[0].text;
            var treeNodeId = treeNode.selectNodes("treeNodeId")[0].text;
            var isUnit = treeNode.selectNodes("isUnit")[0].text;// 1��Ԫ
            var mfFlag = treeNode.selectNodes("mfFlag")[0].text;// ��� ��Ԫ������ĩ��ʶ
            var treeObj = new treeNodeObj(treeNodeId, treeNodeName, null, isUnit, mfFlag);
            _treeVersion.resTreeList.push(treeObj);
        }
    }
    _treeVersion.createKnowTree();//�����γ���
}
//�����ڿ���ർ����
treeVersion.prototype.createKnowTree = function () {

    var courseDiv = "<dl id='course_tree' class=\"course\">", typecount = 0;
    var pnum = 1;
    if (typeof (defaultSelMap) != "undefined")
        _treeVersion.currentCourseId = defaultSelMap["version"];

    {//��������ҳ
        for (var i = 0; i < _treeVersion.resTreeList.length; i++) {
            var treenode = _treeVersion.resTreeList[i];
            if (treenode.nodeid == defaultSelMap["version"]) {
                pnum = Math.ceil((i + 1) / _treeVersion.pagesize);
            }
        }
    }
    var count = 0;//��¼����ʾ����
    for (var i = 0; i < _treeVersion.resTreeList.length; i++) {
        var treeNode = _treeVersion.resTreeList[i];
        var treeNodeName = treeNode.nodename;
        var treeNodeId = treeNode.nodeid;
        var isUnit = treeNode.isunit;// 1��Ԫ
        var mfFlag = treeNode.mfFlag;//��� ��Ԫ������ĩ��ʶ

        if (isUnit == "0") {
            var click = "_treeVersion.clickTreeNode('" + treeNodeId + "','" + treeNodeName + "','" + mfFlag + "');";

            //onclick=\"_common.count('"+treeNodeId+"');_treeVersion.clickTreeNode('"+treeNodeId+"');"+_treeVersion.currentModel+".getRes('"+treeNodeId+"','"+treeNodeName+"');\"
            if (i == _treeVersion.resTreeList.length - 1) {
                courseDiv += "<dd class=\"end\"><li><a move=\"left\" id=\"" + treeNodeId + "\" onclick=\"" + click + "\" href=\"#\" title=\"" + treeNodeName + "\">" + _common.strTrim(treeNodeName) + "</a></li></dd>";
            } else {
                courseDiv += "<dd><li><a move=\"left\" id=\"" + treeNodeId + "\" onclick=\"" + click + "\" href=\"#\" title=\"" + treeNodeName + "\">" + _common.strTrim(treeNodeName) + "</a></li></dd>";
            }
        } else {
            courseDiv += "<dt><li>" + treeNodeName + "</li></dt>";
        }
        count++;
    }
    courseDiv += "</dl>";


    document.getElementById("courseDiv").innerHTML = courseDiv;

    if (_treeVersion.pagesize > count) pnum = 1;
    hasNoNodeTitle = "��δ���õ�ǰ�汾�������ѧ�ư汾�����������õ�ǰ�汾";
    //����ѡ������ʽ

    _common.splitpage("#course_tree li", 1, 1000, "#splitpage", _treeVersion.currentCourseId, true, hasNoNodeTitle);

}
/*//�����汾��ǩ
treeVersion.prototype.createVersionBar= function(name){
    var maxLength=15;
    var h="";
    if(undefined==name||null==name) name='';  
    if(''!=name&&name.length>maxLength)name=name.substring(0,maxLength-1)+"����";
    h="<div class=\"courseName\" ><a onclick=_treeVersion.setSelectPanel()>"+name+"</a></div>";
    return h;
}*/
//����ѡ��Ŀγ�
treeVersion.prototype.saveCourse = function () {

    if (_treeVersion.currentCourseId == null) {
        document.getElementById("version_tips").innerHTML = "��δ���õ�ǰ�γ�!";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    }
    //����ѡ��Ŀγ�
    _treeVersion.currentCourseId = _treeVersion.lastClickTreeNode;
    _treeVersion.currentCourseName = _treeVersion.lastClickTreeNodeName;
    _treeVersion.currentmfFlag = _treeVersion.lastClickmfFlag;
    defaultSelMap["version"] = _treeVersion.currentCourseId;
    $(".topCourseName").css("width", screen.width - 750);
    if (_treeVersion.currentCourseName.length > _pMain.newpagefontsize) _treeVersion.currentCourseName = _treeVersion.currentCourseName.substring(0, _pMain.newpagefontsize) + "��";
    //document.getElementById("topCourseName").innerHTML= "�γ̣�"+_treeVersion.currentCourseName;
    var ksset = "{";
    var count = 0;
    for (key in defaultSelMap) {
        var fvalue = defaultSelMap[key];
        if (count > 0) {
            ksset += ",";
        }
        ksset = ksset + "\"" + key + "\":\"" + fvalue + "\"";
        count++;
    }
    ksset += "}";
    //��ѡ��γ̣����浽��������
    _treeVersion.saveSelNodes(_treeVersion.currKsId, ksset);

    //���õ�ǰĿ¼id
    _common.dirCode = _treeVersion.currentCourseId;

    document.getElementById("selectPanel").style.display = document.getElementById("maskAll").style.display = 'none';
    //�Ƿ�Ϊ�յ�½״̬
    var sel = $("#menu").children().find(".sel");
    if (sel.length > 0) {
        //���͵�¼��
        //initDTQ(1);
        if (_treeVersion.excludeModel.indexOf("," + _treeVersion.currentModel + ",") == -1) {
            eval(_treeVersion.currentModel + ".getRes('" + _treeVersion.currentCourseId + "','" + _treeVersion.currentCourseName + "');");
        }
    } else {
        //document.getElementById("index_0_2").click();
        _commonDiv.showUserClassName();
        //_naUtil.ktjx();//Ĭ�Ͽ��ý�ѧ
    }


}
//�رգ�ȡ����ѡ��Ŀγ�
treeVersion.prototype.closePanel = function () {

    var sel = $("#menu").children().find(".sel");

    if (_treeVersion.currentCourseId == null || sel.length == 0) {
        document.getElementById("version_tips").style.display = '';
        document.getElementById("version_tips").innerHTML = "��δ���õ�ǰ�γ�!";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    }
    document.getElementById("selectPanel").style.display = document.getElementById("maskAll").style.display = 'none';
}
//ȷ��ѡ�пγ�
treeVersion.prototype.setCoursePanel = function () {

    var sel = document.getElementsByName("sel");
    if (sel.length == 0) {
        document.getElementById("version_tips").style.display = '';
        document.getElementById("version_tips").innerHTML = "��δ���õ�ǰ�γ�!";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("version_tips").style.display = 'none';
        $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
    }
    for (var i = 0; i < sel.length; i++) {
        if (sel[i].checked) {
            if (_treeVersion.currKsName != sel[i].value) {
                _treeVersion.currKsName = sel[i].value;
                _treeVersion.currKsId = sel[i].ksId;

                //���ÿγ��б�
                _treeVersion.setResTreeList();

            }
            break;
        }
    }
}
//ȷ��ѡ�а汾
treeVersion.prototype.saveVersion = function () {
    var sel = document.getElementsByName("sel"), i = 0;
    var selectedKsName = null;
    if (sel.length == 0) {
        document.getElementById("version_tips").style.display = '';
        document.getElementById("version_tips").innerHTML = "��δ���õ�ǰ�γ�!";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("version_tips").style.display = 'none';
        $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
    }
    for (var i = 0; i < sel.length; i++) {
        if (sel[i].checked) {
            if (_treeVersion.currKsName != sel[i].value) {
                _treeVersion.currKsName = sel[i].value;
                _treeVersion.currKsId = sel[i].ksId;
            }
            break;
        }
    }
    //������ѡ��İ汾
    if (_macUtil.isReady()) {
        var url = _common.getCurrServerPath() + '/loginLog/externalAccessAddLog.do?1=1';
        url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
        url += '&current.account=' + teachernumber;//�˺� 
        url += '&current.userName=' + encodeURI(encodeURI(teachername));//�û���
        url += '&current.c1=1';//�û���
        if (_treeVersion.currKsId != null) {
            url += '&current.c2=' + _treeVersion.currKsId;//����汾��Ϣ
            currVersionid = _treeVersion.currKsId;
        }
        url += '&current.c3=';
        if ('error' != getMainTeachSeverPath()) {
            url += '&current.ip=' + getMainTeachSeverPath();//����������ip��ַ
        }
        url += '&ajaxdate=' + new Date();
        sendRequest(function () {
        }, url);
    }
    _treeVersion.setResTreeList();
    _treeVersion.reSetCur = 0;
    document.getElementById("selectPanel").style.display = document.getElementById("maskAll").style.display = 'none';
}
//��ʾ�汾ɾ��������
treeVersion.prototype.setDeletePanel = function () {
    var currList = null, title = "", page = "";
    var courseList = "<ul class='classSet'>";
    var sp = document.getElementById("selectPanel"), h = "";
    sp.innerHTML = ""
    var listValue = _treeVersion.currKsId;
    title = "��ѡ����Ҫɾ���İ汾";
    currList = _treeVersion.allVersionList;
    for (var i = 0; i < currList.length; i++) {
        var item = currList[i];
        var ksName = item.ksName;
        var bookId = item.bookId;
        courseList += "<li style='width: 600px;'><LABEL><input name='sel' type='checkbox' value=" + ksName + "  bookId=" + bookId + ">" + ksName + "</LABEL></li>";
    }
    courseList += "</ul>";
    page += "<div class=pageNext><a href='javascript:void(_naUtil.kcsz());'>�� ��</a></div>";
    page += "<div class=pageNext><a href='javascript:void(_treeVersion.Delete());'>ȷ ��</a></div>";
    h += "<div class=divTop id=divTop style='height:" + (540 + _treeVersion.viewHeightMove) + "px'>";
    h += "<div class=divClose onclick='void(_naUtil.kcsz());'></div>";
    h += "<div class=divTitle>ɾ����ѡ�汾</div>";
    h += "<div class=divContent style='overflow:visible'>";
    h += "<h3>" + title + "</h3>"
    h += "<div id='version_tips' style='height:40px;color:#ba0505;display=none' align='center'></div>"
    h += "<div id='sp' style='height:" + (400 + _treeVersion.viewHeightMove) + "px;overflow:auto' align='left'>" + courseList + "</div>";
    h += "<div class=page>" + page + "</div></div></div>";
    h += "<div class=divBottom></div>";
    sp.innerHTML = h;
    sp.style.display = document.getElementById("maskAll").style.display = 'block';

    if (currList.length == 0) {
        document.getElementById("version_tips").style.display = '';
        document.getElementById("version_tips").innerHTML = "����ӱ�ѡ�汾��";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("version_tips").style.display = 'none';
        $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
    }
}
//ɾ��ѡ�а汾
treeVersion.prototype.Delete = function () {
    _treeVersion.bookIds.length = 0;
    var sel = document.getElementsByName("sel"), i = 0;
    var classSet = sel[0].parentNode.parentNode.parentNode;
    for (i = 0; i < sel.length; i++) {
        if (sel[i].checked) {
            if (sel[i].value == this.currKsName) {
                _treeVersion.currKsId = null;
                _treeVersion.currKsName = null;
                _treeVersion.firstKsId = null;
                _treeVersion.firstKsName = null;
            }
            _treeVersion.bookIds.push(sel[i].bookId);
        }
    }
    if (_treeVersion.bookIds.length == 0) {
        document.getElementById("version_tips").style.display = '';
        document.getElementById("version_tips").innerHTML = "��ѡ��Ҫɾ���İ汾";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("version_tips").style.display = 'none';
        $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
    }
    //���ýӿ�ɾ����ѡ�汾
    //var data="queryType=userVersionSetDel&username="+teachernumber+"&bookIs="+_treeVersion.bookIds+"&code=TMS.601&sys=TMS&path=tms/interface/queryVersion.jsp";
    var data = "queryType=userVersionSetDel&username=" + teachernumber + "&bookIds=" + _treeVersion.bookIds;
    var url = transferProtocol_web + _config["PLS"] + "/newteach/inc/trains.jsp";
    //ajaxJson(url,data,"gbk",_treeVersion.resultSituation);
    ajaxJson(_treeVersion.url, data, "gbk", _treeVersion.resultSituation);
}
//��������ѯ
treeVersion.prototype.resultSituation = function (rdata) {
    if (rdata != null && rdata != undefined) {
        var opRsInfo = rdata.opRsInfo;
        var opRsCode = rdata.opRsCode;
        alert(opRsInfo);
        if (opRsCode == "1") {
            _treeVersion.setVersionList(_treeVersion.setResTreeList);
            _treeVersion.bookIds.length = 0;
        } else {
            _treeVersion.bookIds.length = 0;
            _treeVersion.setVersionList(_treeVersion.setResTreeList);
        }
    }
}
//���Ӱ汾��Χ
treeVersion.prototype.addVersionStage = function () {	//��ȡ
    var data = "queryType=gradeSubjectsSchoolByUser&username=" + teachernumber;
    ajaxJson(_treeVersion.url, data, "gbk", _treeVersion.setAddVersionPanel);
}
//��ָ�汾������
treeVersion.prototype.setAddVersionPanel = function (rdata) {
    var sp = document.getElementById("selectPanel"), h = "";
    sp.innerHTML = ""
    var Code = new Array();
    Code.push('<ul class="classSet" ><li style="width:600px"><b>��Ŀ��</b></li>');//ѡ���Ŀ
    _treeVersion.subjectCodesTeacher = "_" + rdata.subjectCodesTeacher.join("_");
    for (var i = 0; i < rdata.subjects.length; i++) {
        var temp = rdata.subjects[i];
        if (_treeVersion.subjectCodesTeacher.indexOf("_" + temp.subjectCode) >= 0) {
            Code.push('<li><LABEL><input name="v_subject" type="checkbox" onclick="_treeVersion.versionAddClicked(this)"  value="_' + temp.subjectCode + '" checked="true">' + temp.subject + '</LABEL></li>');
        } else {
            Code.push('<li><LABEL><input name="v_subject" type="checkbox" onclick="_treeVersion.versionAddClicked(this)"  value="_' + temp.subjectCode + '" >' + temp.subject + '</LABEL></li>');
        }
    }
    Code.push('</ul>');


    Code.push('<ul class="classSet" ><li style="width:600px"><b>�꼶��</b></li>');//ѡ���꼶
    if (rdata.gradeCodesTeacher.length > 0)
        _treeVersion.gradeCodesTeacher = "_" + rdata.gradeCodesTeacher.join("_");//��ȡ��ǰ�꼶�б�   
    else _treeVersion.gradeCodesTeacher = "";
    for (var i = 0; i < rdata.grades.length; i++) {
        var temp = rdata.grades[i];
        if (_treeVersion.gradeCodesTeacher.indexOf("_" + temp.gradeCode) >= 0) {
            Code.push('<li><LABEL><input name="v_grade" type="checkbox" onclick="_treeVersion.versionAddClicked(this)"  value="_' + temp.gradeCode + '" checked="true">' + temp.gradeName + '</LABEL></li>');
        } else {
            Code.push('<li><LABEL><input name="v_grade" type="checkbox" onclick="_treeVersion.versionAddClicked(this)"  value="_' + temp.gradeCode + '" >' + temp.gradeName + '</LABEL></li>');
        }
    }
    var stageCodeH = rdata.stageCodeH;//�Ƿ��ѡ����
    _treeVersion.stageCodeHTeacher = rdata.stageCodeHTeacher;  //�Ƿ�ѡ�и���
    if (stageCodeH == "0003") {
        if (_treeVersion.stageCodeHTeacher == "0003") {
            Code.push('<li><LABEL><input name="v_gradeH" type="checkbox" onclick="_treeVersion.versionAddClicked(this)"  value="0003" checked="true">����</LABEL></li>');
        } else {
            Code.push('<li><LABEL><input name="v_gradeH" type="checkbox" onclick="_treeVersion.versionAddClicked(this)"  value="" >����</LABEL></li>');
        }
    }
    Code.push('</ul>');

    Code.push('<ul class="classSet" id="v_Term"><li style="width:600px"><b>ѧ��:</b></li>');//ѡ��汾
    _treeVersion.currentTerm = rdata.currentTerm
    for (var i = 0; i < _common.termMap.length; i++) {
        var term = _common.termMap[i];
        if (rdata.currentTerm == term.id)
            Code.push('<li><LABEL><input name="v_term" type="radio" onclick="_treeVersion.versionAddClicked(this)"  value="' + term.id + '" checked="true">' + term.name + '</LABEL></li>');
        else
            Code.push('<li><LABEL><input name="v_term" type="radio" onclick="_treeVersion.versionAddClicked(this)"  value="' + term.id + '" >' + term.name + '</LABEL></li>');
    }
    Code.push('</ul>');

    Code.push('<ul class="classSet" id="v_Version"><li style="width:600px"><b>��ǰ�汾:</b></li></ul>');//ѡ��汾


    var page = "<div class=pageNext><a href='javascript:void(_naUtil.kcsz());'>�� ��</a></div>";
    page += "<div class=pageNext><a href='javascript:void(_treeVersion.versionAddSave());'>ȷ ��</a></div>";

    var h = "<div class=divTop id=divTop style='height:" + (540 + _treeVersion.viewHeightMove) + "px'>";
    h += "<div class=divClose onclick='void(_naUtil.kcsz());'></div>";
    h += "<div class=divTitle>���ӱ�ѡ�汾</div>";
    h += "<div class=divContent style='overflow:visible'>";
    h += "<div id='version_tips' style='height:40px;color:#ba0505;display=none' align='center'></div>"
    h += "<div id='sp' style='height:" + (460 + _treeVersion.viewHeightMove) + "px;overflow:auto' align='left'>" + Code.join("") + "</div>";
    h += "<div class=page>" + page + "</div></div></div>";
    h += "<div class=divBottom></div>";
    sp.innerHTML = h;
    sp.style.display = document.getElementById("maskAll").style.display = 'block';
    if (rdata.grades.length == 0 || rdata.subjects.length == 0) {
        document.getElementById("version_tips").style.display = '';
        document.getElementById("version_tips").innerHTML = "ѧУ��δ���ð汾���������Ա��ϵ���߲���ͷ��绰400-637-1319����";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("version_tips").style.display = 'none';
        $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
    }
    _treeVersion.getNewVersionList();
}
//�汾������帴ѡ�򵥻��¼�
treeVersion.prototype.versionAddClicked = function (obj) {
    if (obj == null || obj == undefined) return;
    var sel = null;
    if (obj.name == "v_grade") {//��ȡ�꼶����
        sel = document.getElementsByName("v_grade");
        _treeVersion.gradeCodesTeacher = "";
        for (var i = 0; i < sel.length; i++) {
            if (sel[i].checked) {
                _treeVersion.gradeCodesTeacher += sel[i].value;
            }
        }
    }

    if (obj.name == "v_gradeH") {//�Ƿ�ѡ���˸���
        if (obj.checked) _treeVersion.stageCodeHTeacher = "0003";
        else _treeVersion.stageCodeHTeacher = "";
    }

    if (obj.name == "v_subject") {//��ȡ��ѡ�Ŀ�Ŀ
        sel = document.getElementsByName("v_subject");
        _treeVersion.subjectCodesTeacher = "";
        for (var i = 0; i < sel.length; i++) {
            if (sel[i].checked) {
                _treeVersion.subjectCodesTeacher += sel[i].value;
            }
        }
    }

    if (obj.name == "v_term")//����ѧ��
    {
        sel = document.getElementsByName("v_term");
        _treeVersion.currentTerm = "";
        for (var i = 0; i < sel.length; i++) {
            if (sel[i].checked) {
                _treeVersion.currentTerm = obj.value;
            }
        }
    }

    if (obj.name == "v_version")//����ѧ��
    {
        sel = document.getElementsByName("v_version");
        this.bookIds.length = 0;
        for (var i = 0; i < sel.length; i++) {
            if (sel[i].checked) {
                _treeVersion.bookIds.push(sel[i].value);
            }
        }
        return;
    }
    if (_treeVersion.gradeCodesTeacher == "" && _treeVersion.stageCodeHTeacher == "0003")
        $("#v_Term").hide();
    else
        $("#v_Term").show();
    _treeVersion.getNewVersionList();
}

treeVersion.prototype.getNewVersionList = function () {//��ȡ�����û���Ҫ�İ汾�б�
    var data = "queryType=versionBySubjectsGradesTermSchool&username=" + teachernumber;
    data += "&subjectCodes=" + _treeVersion.subjectCodesTeacher;//��Ŀ��Χ
    data += "&gradeCodes=" + _treeVersion.gradeCodesTeacher;//�꼶��Χ
    data += "&stageCodeH=" + _treeVersion.stageCodeHTeacher;//����
    data += "&termCode=" + _treeVersion.currentTerm;//ѧ��	
    ajaxJson(_treeVersion.url, data, "gbk", _treeVersion.getVersionListByJson);
}
treeVersion.prototype.getVersionListByJson = function (rdata) {
    if (rdata && rdata != "undefined") {
        $("#v_Version").html("<li><b>����Ӱ汾(�Ѿ���ӹ��İ汾������ʾ)</b></li>");
        var Code = new Array();
        Code.length = 0;
        var length = rdata.rtnArray.length;
        if (length == 0) {
            document.getElementById("version_tips").style.display = '';
            document.getElementById("version_tips").innerHTML = "��ǰ��Χ��û�п���Ӱ汾";
            $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
            return;
        } else {
            document.getElementById("version_tips").style.display = 'none';
            $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
        }
        for (var i = 0; i < length; i++) {
            var ks = "";
            var v = rdata.rtnArray[i];
            if (_common.isExit(_treeVersion.currBookIds, v.bookId)) continue;
            if (v.studyStageCode == "0003") ks = v.subject + "|" + v.studyStage + "." + v.version + "." + v.bookOptionName;
            else ks += v.subject + "|" + v.grade + "." + v.term + "." + v.version;
            Code.push('<li style="width:600px"><LABEL><input name="v_version" type="checkbox" onclick="_treeVersion.versionAddClicked(this)"  value="' + v.bookId + '" >' + ks + '</LABEL></li>')
        }
        if (Code.length == 0) {
            document.getElementById("version_tips").style.display = '';
            document.getElementById("version_tips").innerHTML = "��ǰ��Χ��û�п���Ӱ汾";
            $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
            return;
        } else {
            document.getElementById("version_tips").style.display = 'none';
            $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
        }
        $("#v_Version").append(Code.join(""));
    }
}
treeVersion.prototype.versionAddSave = function () {//����û���ѡ��İ汾
    if (_treeVersion.bookIds.length == 0) {
        document.getElementById("version_tips").style.display = '';
        document.getElementById("version_tips").innerHTML = "��δѡ���κΰ汾���޷�ִ��������";
        $("#divTop").css("height", 580 + _treeVersion.viewHeightMove);
        return;
    } else {
        document.getElementById("version_tips").style.display = 'none';
        $("#divTop").css("height", 540 + _treeVersion.viewHeightMove);
    }
    var data = "queryType=userVersionSet&username=" + teachernumber + "&bookIds=" + _treeVersion.bookIds;
    var url = _treeVersion.url + data;
    ajaxJson(_treeVersion.url, data, "gbk", _treeVersion.resultSituation);
}


//���ѡ��Ŀ¼,�л�Ŀ¼
treeVersion.prototype.clickTreeNode = function (currentCourseId, currentCourseName, mfFlag, obj) {
    $(obj).parent().find('h6').removeClass('cur');
    $(obj).parent().find('h5').removeClass('cur');

    if (_naUtil.selectMenuName == '���ý�ѧ') {
        var nowClassHourId = $(obj).attr('classHourId');
        var nextClassHourId = $(obj).next().attr('classHourId');
        if (nowClassHourId == '') {
            //û�п�ʱ(ѡ���½�)
            $(obj).find('h5').addClass('cur');
            _treeVersion.currentClassHourName = '';
        } else {
            if (nowClassHourId == nextClassHourId) {
                $(obj).next().find('h6').addClass('cur');
                _treeVersion.currentClassHourName = $(obj).attr('classHourName');
            } else {
                var ksId = $(obj).attr('ksId');
                if (_common.isBlank(ksId)) {
                    _treeVersion.currentClassHourName = $(obj).attr('classHourName');
                } else {
                    _treeVersion.currentClassHourName = '';
                }
                $(obj).find('h6').addClass('cur');
                $(obj).find('h5').addClass('cur');
            }
        }
    } else {
        $(obj).find('h6').addClass('cur');
        $(obj).find('h5').addClass('cur');
    }


    //����������Ŀγ�
    _treeVersion.currentCourseId = currentCourseId;
    _treeVersion.currentCourseName = currentCourseName;
    _treeVersion.currentmfFlag = mfFlag;
    _treeVersion.lastClickTreeNode = currentCourseId;
    _treeVersion.lastClickTreeNodeName = currentCourseName;
    _treeVersion.lastClickmfFlag = mfFlag;//0,��ͨ�γ�;1,��Ԫ��ϰ;2,����;3,��ĩ
    _treeVersion.currentClassHourId = $(obj).attr('classHourId');
    _treeVersion.addLastCourse();
    _treeVersion.showMenuInfo();
    if (!_common.isBlank(_treeVersion.currentModel)) {
        eval(_treeVersion.currentModel + ".getRes('" + _treeVersion.currentCourseId + "','" + _treeVersion.currentCourseName + "');");
    }

}

//��¼��ǰ�û�ѡ���Ŀ¼�����ݿ�
treeVersion.prototype.addLastCourse = function () {
    var param = '?module=bk&userName=' + teachernumber + '&section=' + _treeVersion.currentSection;
    if (_treeVersion.currentSection == '0003') {
        param += '&rxiu=' + _treeVersion.currentBookOptionCode;
    } else {
        param += '&volume=' + _treeVersion.currentTerm + '&grade=' + _treeVersion.currentGrade;
    }

    param += '&subject=' + _treeVersion.currentSubject;
    param += '&versions=' + _treeVersion.currentVersion + '&menuCode=' + _treeVersion.lastClickTreeNode + '&bookId=' + _treeVersion.currentBookId;

    if (_naUtil.selectMenuName == '���ý�ѧ') {
        if (!_common.isBlank(_treeVersion.currentClassHourId)) {
            param += '&classHourId=' + _treeVersion.currentClassHourId;
        }
    }

    var url = transferProtocol_web + _config["PLS"] + '/youjiao2/addLastCourseSetP.do' + param;
    ajaxJson(url, null, "gbk", _treeVersion.addUserLastCourseToDb);
}

treeVersion.prototype.addUserLastCourseToDb = function (data) {
    //console.log(data);
}


//�����û��Ŀγ̰汾����
treeVersion.prototype.saveSelNodes = function (versionid, ksset) {
    if (loginStyle == 1) return;
    currVersionid = versionid;
    if (_macUtil.isReady()) {
        var url = _common.getCurrServerPath() + '/loginLog/externalAccessAddLog.do?1=1';
        url += '&current.mac=' + _macUtil.getMACAdd();//mac��ַ
        url += '&current.account=' + teachernumber;//�˺� 
        url += '&current.userName=' + encodeURI(encodeURI(teachername));//�û���
        url += '&current.c1=1';//�û���
        if (versionid) {
            url += '&current.c2=' + versionid;//����汾��Ϣ
        }
        if (ksset) {
            url += '&current.c3=' + ksset;//�������Ŀ�γ�ѡ����Ϣ
        }
        if ('error' != getMainTeachSeverPath()) {
            url += '&current.ip=' + getMainTeachSeverPath();//����������ip��ַ
        }
        url += '&ajaxdate=' + new Date();
        sendRequest(function () {
        }, url);
    }
}
treeVersion.prototype.getCurrentVersion = function () {
    if (typeof (_treeVersion.currKsId) != "undifined" && _treeVersion.currKsId != null) {
        for (var i = 0; i < _treeVersion.versionList.length; i++) {
            var v = _treeVersion.versionList[i];
            if (this.currKsId == v.ksId) {
                return v;
            }
        }
    }
    return this.versionList[0];
}

//�û��汾����
function userSetObj(termName, termCode, subjectId, subjectName, stageCode, stageName, gradeId, bookId, ksId, ksName, ksTrueName) {
    this.termName = termName;//ѧ������
    this.termCode = termCode;//ѧ�ڱ��

    this.subjectId = subjectId;//��Ŀ����
    this.subjectName = subjectName;//��Ŀ����

    this.stageCode = stageCode;//ѧ�α���
    this.stageName = stageName;//ѧ����

    this.gradeId = gradeId;//��ͱ���   
    this.bookId = bookId;//�鱾���

    this.ksId = ksId;// �汾Ŀ¼id    
    this.ksName = ksName;//�汾ȫ��
    this.ksTrueName = ksTrueName;//�汾����  
}

//������
function treeNodeObj(nodeid, nodename, ksid, isunit, mfFlag) {
    this.nodeid = nodeid;
    this.nodename = nodename;
    this.ksid = ksid;
    this.isunit = isunit;
    this.mfFlag = mfFlag;
}