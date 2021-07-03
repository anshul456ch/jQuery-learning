// TMJROCK part starts here
function $$$(cid){
let element=document.getElementById(cid);
if(!element) throw "Invalid id : "+cid;

let parameter=cid;
if(element.tagName=="FORM")
{
document.getElementById(parameter).isValid=function(obj)
{
var valid=true;
for(var key in obj)
{
var elements=document.getElementsByName(key);
if(elements.length==1)
{
var element=elements[0];
elementType=element.type;
if(elementType=='text')
{
value=element.value.trim();
document.getElementById(obj[key].errorPane).innerHTML="";
if(obj[key].required==true && value=="")
{
valid=false;
document.getElementById(obj[key].errorPane).style="color:red";
document.getElementById(obj[key].errorPane).innerHTML=obj[key].errors.required;
} 
if(value.length>obj[key].maxLength)
{
valid=false;
document.getElementById(obj[key].errorPane).style="color:red";
document.getElementById(obj[key].errorPane).innerHTML=obj[key].errors.maxLength;
}
}
if(elementType=='textarea')
{
value=element.value.trim();
document.getElementById(obj[key].errorPane).style="color:red";
document.getElementById(obj[key].errorPane).innerHTML="";
if(obj[key].required==true && value=="")
{
valid=false;
document.getElementById(obj[key].errorPane).style="color:red";
document.getElementById(obj[key].errorPane).innerHTML=obj[key].errors.required;
}
}
if(elementType=='select-one')
{
value=element.value;
document.getElementById(obj[key].errorPane).style="color:red";
document.getElementById(obj[key].errorPane).innerHTML="";
if(value==obj[key].invalid)
{
valid=false;
document.getElementById(obj[key].errorPane).innerHTML=obj[key].errors.invalid;
}
}
if(elementType=='checkbox')
{
if(obj[key].requiredState!=element.checked && obj[key].displayAlert==true)
{
alert(obj[key].errors.requiredState);
}
}
}// if condition for elementSize==1 ends here
else
{
var firstElement=elements[0];
var secondElement=elements[1];
if(firstElement.type=='radio' && secondElement.type=='radio')
{
document.getElementById(obj[key].errorPane).innerHTML="";
if(obj[key].required==true && firstElement.checked==false && secondElement.checked==false)
{
valid=false;
document.getElementById(obj[key].errorPane).style="color:red";
document.getElementById(obj[key].errorPane).innerHTML=obj[key].errors.required;
}
}
}
}// for loop ends here
return valid;
}// isValid function ends here
return document.getElementById(parameter)
}











return new TMJRockElement(element);
}

$$$.model={
"onStartup":[],
"accordians":[],
"modals": []
};
// modal specific code starts here
$$$.modals={};

$$$.modals.show=function(mid)
{
var modal=null;
for(var i=0;i<$$$.model.modals.length;i++)
{
if($$$.model.modals[i].getContentId()==mid)
{
modal=$$$.model.modals[i];
break;
}
}
if(modal==null) return;
modal.show();
}
// following is a class
function Modal(cref)
{
var objectAddress=this;
// some property that can be used to decide if the modal should be closed if the user clicks outside the modal area
this.beforeOpening=null;
this.afterOpening=null;
this.beforeClosing=null;
this.afterClosing=null;
var contentReference=cref;
this.getContentId=function(){
return contentReference.id;
}
var contentParentReference=contentReference.parentElement;
var contentIndex=0;
while(contentIndex<contentParentReference.children.length)
{
if(contentReference==contentParentReference.children[contentIndex])
{
break;
}
contentIndex++;
}
var modalMaskDivision=document.createElement("div");
modalMaskDivision.style.display="none";
modalMaskDivision.classList.add("tmjrock_modalMask");
var modalDivision=document.createElement("div");
modalDivision.style.display="none";
modalDivision.classList.add("tmjrock_modal");
document.body.appendChild(modalMaskDivision);
document.body.appendChild(modalDivision);
var headerDivision=document.createElement("div");
headerDivision.style.background="#011627";
headerDivision.style.color="white";
headerDivision.style.textAlign="justify";
headerDivision.style.fontSize="22px";
headerDivision.style.right="0";
headerDivision.style.height="40px";
headerDivision.style.padding="5px";
headerDivision.style.paddingTop="20px";
modalDivision.appendChild(headerDivision);

if(contentReference.hasAttribute("size"))
{
var sz=contentReference.getAttribute("size");
let xpos=sz.indexOf("x");
if(xpos==-1) xpos=indexOf("X");
if(xpos==-1) throw "In case of modal size should be specified as widthxheight";
if(xpos==0 || xpos==sz.length-1) throw "In case of modal size should be specified as widthxheight";
let width=sz.substring(0,xpos);
let height=sz.substring(xpos+1);
modalDivision.style.width=width+"px";
modalDivision.style.height=height+"px";  
}
else
{
modalDivision.style.width="300px";
modalDivision.style.height="300px";
}
if(contentReference.hasAttribute("header"))
{
var hd=contentReference.getAttribute("header");
headerDivision.innerHTML=hd;
}
if(contentReference.hasAttribute("maskColor"))
{
var mkc=contentReference.getAttribute("maskColor");
modalMaskDivision.style.background=mkc;
}
if(contentReference.hasAttribute("modalBackgroundColor"))
{
var mbc=contentReference.getAttribute("modalBackgroundColor");
modalDivision.style.background=mbc;
}

var contentDivision=document.createElement("div");
//contentDivision.style.border="1px Solid Black";
contentDivision.style.height=(modalDivision.style.height.substring(0,modalDivision.style.height.length-2)-130)+"px";
contentDivision.style.width="98%";
contentDivision.style.overflow="auto";
contentDivision.style.padding="5px";

contentReference.remove();
contentDivision.appendChild(contentReference);
contentReference.style.display='block';
contentReference.style.visibility='visible';
modalDivision.appendChild(contentDivision);

var footerDivision=document.createElement("div");
footerDivision.style.background="#FF9F1C";
footerDivision.style.left="0";
footerDivision.style.right="0";
footerDivision.style.color="#011627";
footerDivision.style.textAlign="justify";
footerDivision.style.fontSize="18px";
footerDivision.style.height="40px";
footerDivision.style.position="absolute";
footerDivision.style.bottom="0";
footerDivision.style.padding="7px";
modalDivision.appendChild(footerDivision);


if(contentReference.hasAttribute("footer"))
{
var ft=contentReference.getAttribute("footer");
footerDivision.innerHTML=ft;
}
var closeButtonSpan=null;
if(contentReference.hasAttribute("closeButton"))
{
var cb=contentReference.getAttribute("closeButton");
if(cb.toUpperCase()=="TRUE")
{
closeButtonSpan=document.createElement("span");
closeButtonSpan.classList.add("tmjrock_closeButton");
var closeButtonMarker=document.createTextNode("x");
closeButtonSpan.appendChild(closeButtonMarker);
headerDivision.appendChild(closeButtonSpan);
}
}

if(contentReference.hasAttribute("beforeOpening"))
{
var oo=contentReference.getAttribute("beforeOpening");
this.beforeOpening=oo;
}
if(contentReference.hasAttribute("afterOpening"))
{
var oo=contentReference.getAttribute("afterOpening");
this.afterOpening=oo;
}
if(contentReference.hasAttribute("beforeClosing"))
{
var oc=contentReference.getAttribute("beforeClosing");
this.beforeClosing=oc;
}
if(contentReference.hasAttribute("afterClosing"))
{
var oc=contentReference.getAttribute("afterClosing");
this.afterClosing=oc;
}

this.show=function(){
let openModal=true;
if(this.beforeOpening)
{
openModal=eval(objectAddress.beforeOpening);
}
if(openModal)
{
modalMaskDivision.style.display="block";
modalDivision.style.display="block";
if(this.afterOpening) setTimeout(function(){eval(objectAddress.afterOpening);},100);
}
};

if(closeButtonSpan!=null)
{
closeButtonSpan.onclick=function(){
let closeModal=true;
if(objectAddress.afterClosing)
{
closeModal=eval(objectAddress.beforeClosing);
}
if(closeModal)
{
modalDivision.style.display="none";
modalMaskDivision.style.display="none";
if(objectAddress.afterClosing) setTimeout(function(){eval(objectAddress.afterClosing);},100);
}
}
}
}

// modal specific code ends here



//accordian pan specific code starts from here
$$$.accordianHeadingClicked=function(accordianIndex,panelIndex)
{
if($$$.model.accordians[accordianIndex].expandedIndex!=-1) $$$.model.accordians[accordianIndex].panels[$$$.model.accordians[accordianIndex].expandedIndex].style.display='none';
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display=$$$.model.accordians[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.width="89%";
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.height="auto";
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.padding="5px";
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.border="2px solid black";
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.marginTop="-2px";
$$$.model.accordians[accordianIndex].expandedIndex=panelIndex+1;
}


$$$.toAccordian=function(accord)
{
let panels=[];
let expandedIndex=-1;
let children=accord.childNodes;
let x;
for(x=0;x<children.length;x++)
{
if(children[x].nodeName=="H3")
{
panels[panels.length]=children[x];
children[x].style.margin="0px";
children[x].style.width="89%";
children[x].style.padding="5px";
children[x].style.border="2px solid black";
children[x].style.color="#FFF";
children[x].style.borderRadius="5px";
children[x].style.cursor="pointer";
if(children[x].hasAttribute("accordianHeadrerBackgroundColor")) children[x].style.background=children[x].getAttribute("accordianHeadrerBackgroundColor");
else  children[x].style.background="#FF9F17";
}
if(children[x].nodeName=="DIV")
{
panels[panels.length]=children[x];
if(children[x].hasAttribute("accordianBackgroundColor")) children[x].style.background=children[x].getAttribute("accordianBackgroundColor");
else  children[x].style.background="#FFF";
}
}
if(panels.length%2!=0) throw "Headings and division malformed to create accordian";
for(x=0;x<panels.length;x+=2)
{
if(panels[x].nodeName!="H3") throw "Headings and division malformed to create accordian";
if(panels[x+1].nodeName!="DIV") throw "Headings and division malformed to create accordian";
}
function createClickHandler(accordianIndex,panelIndex)
{
return function(){
$$$.accordianHeadingClicked(accordianIndex,panelIndex);
};
}
let accordianIndex=$$$.model.accordians.length;
for(x=0;x<panels.length;x+=2)
{
panels[x].onclick=createClickHandler(accordianIndex,x);
panels[x+1].oldDisplay=panels[x+1].style.display;
panels[x+1].style.display="none"; 
}

$$$.model.accordians[accordianIndex]={
"panels":panels,
"expandedIndex": -1
};

}
$$$.onDocumentLoaded=function(func){
if((typeof func)!="function") throw "Expected function, found "+(typeof func)+" is call to onDocumentLoaded";
$$$.model.onStartup[$$$.model.onStartup.length]=func;
}

$$$.initFramework=function(){
let allTags=document.getElementsByTagName("*");
let t=null;
let i=0;
let a=null;
for(i=0;i<allTags.length;i++)
{
t=allTags[i];
if(t.hasAttribute("accordian"))
{
a=t.getAttribute("accordian");
if(a=="true")
{
$$$.toAccordian(t);
}
}
}
let x=0;
while(x<$$$.model.onStartup.length)
{
$$$.model.onStartup[x]();
x++;
}
// setting up Modal part starts here
var all=document.getElementsByTagName("*");
for(i=0;i<all.length;i++)
{
if(all[i].hasAttribute("forModal"))
{
if(all[i].getAttribute("forModal").toUpperCase()=="TRUE")
{
all[i].setAttribute("forModal","false");
$$$.model.modals[$$$.model.modals.length]=new Modal(all[i]);
i--;
}
}
}
// setting up Modal part ends here
}  // end of initFramework


function TMJRockElement(element)
{
this.element=element;
this.html=function(content)
{
if(typeof this.element.innerHTML=="string")
{
if((typeof content)=="string")
{
this.element.innerHTML=content;
}
return this.element.innerHTML;
}
return null;
} // html function ends

this.value=function(content)
{
if(typeof this.element.value)
{
if((typeof content)=="string")
{
this.element.value=content;
}
return this.element.value;
}
return null;
} // html function ends
this.fillComboBox=function(jsonObject){
if(!jsonObject["dataSource"]) throw "dataSource property missing in call to fillComboBox";
if(!jsonObject["text"]) throw "text property missing in call to fillComboBox";
if(!jsonObject["value"]) throw "value property missing in call to fillComboBox";
let dataSource=jsonObject["dataSource"];
if((typeof dataSource)!="object" || !dataSource.hasOwnProperty(length)) throw "dataSource property should be collection in call to fillComboBox";
if(dataSource.length==0) throw "The size collection against dataSource property should not be zero";
let value=jsonObject["value"];
if((typeof value)!="string") throw "value property should be of string type in call to fillComboBox";
let text=jsonObject["text"];
if((typeof text)!="string") throw "text property should be of string type in call to fillComboBox";
if(!dataSource[0].hasOwnProperty(text)) throw "Collection has no property named as :"+text;
if(!dataSource[0].hasOwnProperty(value)) throw "Collection has no propery names as :"+value;
var firstOptionText=null;
var firstOptionValue=null;
if(jsonObject["firstOption"])
{
if(!jsonObject.firstOption["text"]) throw "text property associated with the firstOption property is missing in call to fillComboBox";
if(!jsonObject.firstOption["value"]) throw "value property associated with the firstOption property is missing in call to fillComboBox";
firstOptionText=jsonObject.firstOption["text"];
if((typeof firstOptionText)!="string") throw "text property associated with the firstOption property should be of string type in call to fillComboBox";
firstOptionValue=jsonObject.firstOption["value"];
if((typeof firstOptionValue)!="string") throw "value property associated with the firstOption property should be of string type in call to fillComboBox";
}
let comboBox=this.element;
var obj;
for(var i=0;i<comboBox.length;i++) comboBox.removeChild(comboBox.childNodes[0]);
if(jsonObject["firstOption"])
{
obj=document.createElement("option");
obj.value=firstOptionValue;
obj.text=firstOptionText;
comboBox.appendChild(obj);
}
for(var i=0;i<dataSource.length;i++)
{
var t=dataSource[i];
obj=document.createElement("option");
obj.value=t[value];
obj.text=t[text];
comboBox.appendChild(obj);
}
}//fillComboBox ends here

} // class TMJRockElement ends


$$$.ajax=function(jsonObject)
{
if(!jsonObject["url"]) throw "url property is missing in call to ajax";
let url=jsonObject["url"];
if((typeof url)!="string") throw "url property should be of string type in call to ajax";
let methodType="GET";
if(jsonObject["methodType"])
{
methodType=jsonObject["methodType"]
if((typeof methodType)!="string") throw "methodType property should be of string type in call to ajax";
methodType=methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false) throw "methodType should be GET/POST in call to ajax";
}
let onSuccess=null;
if(jsonObject["success"])
{
onSuccess=jsonObject["success"];
if((typeof onSuccess)!="function") throw "success property should be a function in call to ajax";
}
let onFailure=null;
if(jsonObject["failure"])
{
onFailure=jsonObject["failure"];
if((typeof onFailure)!="function") throw "failure property should be a function in call to ajax";
}
if(methodType=="GET")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
//we will change the code to traverse a jsonData
if(jsonObject["data"])
{
let jsonData=jsonObject["data"];
let queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
if(xx==0)queryString="?";
if(xx>0)queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
url=url+queryString;
}
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
} // get part ends here
if(methodType=="POST")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
let jsonData={};
let sendJSON=jsonObject["sendJSON"];
if(!sendJSON) sendJSON=false;

if((typeof sendJSON)!="boolean")throw "sendJSON property should be of boolean type in ajax call";
let queryString="";
if(jsonObject["data"])
{
if(sendJSON)
{
jsonData=jsonObject["data"];
}
else
{
queryString="";
let qsName;
let qsValue;
let xx=0;
//we will change the code to traverse a jsonData
for(k in jsonData)
{
//if(xx==0)queryString="?";
if(xx>0)queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
}
}
xmlHttpRequest.open('POST',url,true);
if(sendJSON)
{
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(jsonData));
}
else
{
//What will be written over here to send request Header
xmlHttpRequest.send(queryString);
}
}
}

window.addEventListener('load',function(){
$$$.initFramework();
});

// TMJROCK part ends here 






