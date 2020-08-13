//ǧһ���� www.cftea.com
//Progress���������� v2.0
//http://www.cftea.com/products/webComponents/Progress/
//���ļ�Ϊ utf-8 ��ʽ
//Ӧ��ʾ����
/*
<p>������ 1��</p>
<div id="pp1"></div>

<p>������ 2��</p>
<table>
  <tr>
    <td id="pp2"></td>
    <td id="pp2Text"></td>
  </tr>
</table>

<p>������ 3��</p>
<div id="pp3"></div>
<div>
  <input type="button" value="����һ�� step" onclick="javascript:progress3.desc();" />
  <input type="button" value="���� position Ϊ 50" onclick="javascript:progress3.setPosition(50);" />
  <input type="button" value="����һ�� step" onclick="javascript:progress3.inc();" />
</div>


<script type="text/javascript" src="Progress.js"></script>
<script type="text/javascript">
<!--
//ǧһ���� www.cftea.com

var progress1 = new Progress("pp1", 0, 100, 100, 1, new ProgressStyle(200, 10, "#009999", "#00CCCC"));
progress1.create();
setInterval(function () { progress1.desc(); }, 50);

var progress2 = new Progress("pp2", 0, 100, 0, 1, new ProgressStyle(300, 20, "#CC0000", "#FF3333"));
progress2.onPositionChange = function () {
    document.getElementById("pp2Text").innerHTML = parseInt(progress2.position * 100 / (progress2.max - progress2.min)) + "%";
};
progress2.create();
setInterval(function () { progress2.inc(); }, 50);

var progress3 = new Progress("pp3", 0, 100, 25, 25, new ProgressStyle(200, 20, "#009999", "#FF0000"));
progress3.create();
-->
</script>
*/


//��������ʽ
//���� width�����֣���������ȡ�
//���� height�����֣��������߶ȡ�
//���� borderWidth�����֣��������߿��ϸ���߿��ǰ����� width �� height �еģ�Ĭ��ֵΪ 1��
//���� borderColor���ַ������������߿����ɫ��
//���� barMargin�����֣�����������ʾ����߿�ľ��룬Ĭ��ֵΪ 1��
//���� barColor���ַ���������������ʾ������ɫ��
function ProgressStyle(width, height, borderColor, barColor) {
    this.width = width;
    this.height = height;

    this.borderWidth = 1;
    this.borderColor = borderColor;

    this.barMargin = 1;
    this.barColor = barColor;
}

//������
//���� targetIdOrTarget���ַ����� object�����ؽ������� HTML �ؼ� Id ���ƻ�ؼ�����
//���� min�����֣�����������Сָʾֵ��
//���� max�����֣������������ָʾֵ��
//���� position�����֣��������ĵ�ǰָʾֵ��
//���� step�����֣��������������ȡ�
//���� progressStyle��ProgressStyle������������ʽ��
//�¼� onPositionChange���������������ĵ�ǰָʾֵ�����ı�ʱ��Ӧ�ķ�����
//���� create()��������������
//���� setPosition�����ý������ĵ�ǰָʾֵ��
//���� desc���������ĵ�ǰָʾֵ����һ�� step��
//���� inc���������ĵ�ǰָʾֵ����һ�� step��
function Progress(targetIdOrTarget, min, max, position, step, progressStyle) {

    this.target = (typeof (targetIdOrTarget) == "string") ? document.getElementById(targetIdOrTarget) : targetIdOrTarget;
    this.targetid = targetIdOrTarget;
    this.object = null;
    this.bar = null;
    this.min = min;
    this.max = max;
    this.position = position;
    this.step = step;
    this.progressStyle = progressStyle;

    this.onPositionChange = null;

    this.create = Progress_create;
    this.setPosition = Progress_setPosition;
    this.desc = Progress_desc;
    this.inc = Progress_inc;
}

function Progress_create() {
    this.object = document.createElement("div"); //������ span����Ϊ span �޿�ȡ�
    this.object.style.width = this.progressStyle.width + "Px";
    this.object.style.height = this.progressStyle.height + "px";
    this.object.style.fontSize = "0px"; //������Щ������������ִ�СӰ�� div ����С�߶ȡ�
    this.object.id = this.targetid + "_scroll"
    this.target.appendChild(this.object);

    var container = document.createElement("div"); //Ϊ�˼��ݲ�ͬ������У��� border��margin �Ƿ������ width �еĲ�ͬ���ͣ�����һ�� container��
    container.style.border = this.progressStyle.borderWidth + "px solid " + this.progressStyle.borderColor;
    container.style.padding = this.progressStyle.barMargin + "px"; //���� container �� padding���Դﵽ bar �� margin Ч����
    container.style.fontSize = "0px";
    this.object.appendChild(container);

    this.bar = document.createElement("div");
    this.bar.style.height = (this.progressStyle.height - this.progressStyle.borderWidth * 2 - this.progressStyle.barMargin * 2) + "px";
    this.bar.style.backgroundColor = this.progressStyle.barColor;
    this.bar.style.fontSize = "0px";
    container.appendChild(this.bar);


    this.setPosition(this.position); //���ó�ʼλ��
}


//������ֵλ�����õ�ָ��ֵ��
function Progress_setPosition(position) {
    if (position < this.min) {
        this.position = this.min;
        this.bar.style.width = "0px";
    } else if (position > this.max) {
        this.position = this.max;
        this.bar.style.width = (this.progressStyle.width - this.progressStyle.borderWidth * 2 - this.progressStyle.barMargin * 2) + "px";
    } else {
        this.position = position;
        this.bar.style.width = ((this.position / (this.max - this.min)) * (this.progressStyle.width - this.progressStyle.borderWidth * 2 - this.progressStyle.barMargin * 2)) + "px";
    }

    if (typeof (this.onPositionChange) == "function") {
        this.onPositionChange(); //�¼�
    }
}


//��������ǰָʾֵ����һ�� step��
function Progress_desc() {
    this.setPosition(this.position - this.step);
}


//��������ǰָʾֵ����һ�� step��
function Progress_inc() {
    this.setPosition(this.position + this.step);
}