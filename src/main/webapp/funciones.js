window.addEventListener("DOMContentLoaded", function () {
	Array.from(document.forms).forEach((form) => {
		form.setAttribute("autocomplete", "off");
	})
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function isDefined(str) {
	return str != null && str != "" && str != "null"; 
}

function replaceAll(str, find, replace){
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function showAlert(message) {
	alert(message);
}

function stringToNumber(numero, separadorMiles, separadorDecimal) {
	var num = ""; 
	if (numero != null && numero != ""){
		// Pasamos la variable a cadena
		numero = numero + "";
		// quitar separador de miles
		if (separadorMiles != "") {
			numero = replaceAll(numero, separadorMiles, "");
		}
		// establecer como separador decimal siempre el punto
		numero = numero.replace(separadorDecimal, ".");
		// devolver un numero
		num = numero;
	}
	return num;
}

function imprimePantalla(ventana)
{
	ventana.print();
}

function getProtocolHost() {
	return (window.location.protocol) + "//" + window.location.host;
}

function getPosicionCursor (oField) {

     var iCaretPos = 0;
     if (document.selection) {
       oField.focus ();
       var oSel = document.selection.createRange ();
       oSel.moveStart ('character', -oField.value.length);
       iCaretPos = oSel.text.length;
     } else if (oField.selectionStart || oField.selectionStart == '0'){
		//para firefox
		iCaretPos = oField.selectionStart;
	}
     return (iCaretPos);
}

function setPosicionCursor(obj,pos) {
	var tr = obj.createTextRange();
	tr.moveStart("character", pos);
	tr.collapse();
	tr.select();
	return true;
}

// Converteix el valor de un input.text o input.textarea a upper case
function toUpper(component)
{
	var posicion = getPosicionCursor(component);
	component.value = component.value.toUpperCase();
	setPosicionCursor(component,posicion);
}

function popUpNoModal(URL, ancho, alto, izq, sup, targetOrigen) {
	var target = null;
	if(targetOrigen){
		target = targetOrigen;
	}
	
	var params = null;
	if (arguments.length > 1 && ancho != null && alto != null && izq != null && sup != null) {
		params = "menubar=0,width="	+ ancho + ",height=" + alto + ",left=" + izq + ", top=" + sup;
	}

	miPopup = windowOpen(URL, target, params);
	if (miPopup) {
		miPopup.focus();
		return miPopup;
	} else {
		return null;
	}
}

function windowOpen(url, target, windowFeatures) {
	var newURL = null;
	if (arguments.length > 0) {
		newURL = encodeURI(addToken(url));
	}
	return window.open(newURL, target, windowFeatures);
}

/**
 * 
 * @param url
 * @param loc
 * @param newCsrfToken
 * @param encodedParams Parametros que se quieren pasar en la URL sin hacer un decode.
 *	Ejemplo: En el BackURL de la vista global, se necesita pasar una url codificada. Si se hace un decode, ciertos caracteres dan problemas.
 * @returns
 */
function windowReplace(url, loc, newCsrfToken, encodedParams) {
	var newURL = null;
	if (url.lastIndexOf("/") != url.charAt(url.length-1)) {
		if (newCsrfToken) {
			newURL = addToken(url, newCsrfToken); // Nuevo usuario, por tanto nuevo token
		} else {
			newURL = addToken(url);
		}
	} else {
		newURL = url;
	}
	// Hay que usar el URLDecode porque la URL puede venir de un browser que usa el URLencode para los parametros
	newURL = URLDecode(newURL);

	//Si se reciben parametros que necesitan no hacer un decode, se añaden al final.
	if(encodedParams && encodedParams != ''){
		newURL = newURL + "&" + encodedParams;
	}
	if (loc) {
		loc.replace(encodeURI(newURL));
		
	} else {
		window.location.replace(encodeURI(newURL));	
	}
}

function windowRefresh(win, newCsrfToken) {
	// El metodo location.reload() carga de nuevo la URL actual,
	// pero puede estar bloqueada y arrojar un SECURITY_ERROR DOMException.
	// location.reload() tambien mantiene los datos usados por POST.
	windowReplace(getLocation(win), null, newCsrfToken);
}

function getLocation(win) {
	if (arguments.length === 1 && win != null) {
		return win.location.href;
	} else {
		return window.location.href;	
	}
}

function getLocationWithoutParams(win) {
	if (arguments.length === 1) {
		return win.location.href.split('?')[0];
	} else {
		return window.location.href.split('?')[0];	
	}
}

function replaceUrlParam(url, paramName, paramValue) {
    if (paramValue == null) {
        paramValue = '';
    }
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
    if (url.search(pattern)>=0) {
        return url.replace(pattern,'$1' + paramValue + '$2');
    }
    url = url.replace(/[?#]$/,'');
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
}

function on(src, on_color){
   if(!src.contains(event.fromElement)){
      src.style.backgroundColor = on_color;
   }
}

function out(src, out_color){
   if(!src.contains(event.toElement)){
      src.style.backgroundColor = out_color;
   }
}


function textLimit(field, maxlimit) {
	// Los saltos de línea en javascript cuentan como 1, pero al servidor le llega "\r\n".
	// Esto depende del navegador y SO.
	var text = field.value.replace(/(?:\r\n|\r|\n)/g, '__');
	if (text.length > maxlimit) {
		var limit = maxlimit - (text.length - field.value.length);
		field.value = field.value.substring(0, limit);
	}
}

//Si se pasa texto por URL es mejor codificarlo antes, evitando así, los carácteres especiales, como acentos, %, &, etc...
function URLEncode(plaintext)
{
	var SAFECHARS = "0123456789" +					// Numeric
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
					"abcdefghijklmnopqrstuvwxyz" +
					"-_.!~*'()";					// RFC2396 Mark characters
	var HEX = "0123456789ABCDEF";
	var encoded = "";
	for (var i = 0; i < plaintext.length; i++ ) {
		var ch = plaintext.charAt(i);
	    if (ch == " ") {
		    encoded += "+";				// x-www-urlencoded, rather than %20
		} else if (SAFECHARS.indexOf(ch) != -1) {
		    encoded += ch;
		} else {
		    var charCode = ch.charCodeAt(0);
			if (charCode > 255) { encoded += "+"; }
			else {
				encoded += "%";
				encoded += HEX.charAt((charCode >> 4) & 0xF);
				encoded += HEX.charAt(charCode & 0xF);
			}
		}
	} // for

	return encoded;
}
function URLDecode( encoded, utilsDWR )
{
   // Replace + with ' '
   // Replace %xx with equivalent character
   // Put [ERROR] in output if %xx is invalid.
   var HEXCHARS = "0123456789ABCDEFabcdef";
   var plaintext = "";
   var i = 0;
   while (i < encoded.length) {
       var ch = encoded.charAt(i);
	   if (ch == "+") {
	       plaintext += " ";
		   i++;
	   } else if (ch == "%") {
			if (i < (encoded.length-2)
					&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1
					&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
				plaintext += unescape( encoded.substr(i,3) );
				i += 3;
			} else {
				var parametros = [encoded.substr(i)];
				utilsDWR.getMensaje('error.decode.url', parametros, showAlert);
				plaintext += "%[ERROR]";
				i++;
			}
		} else {
		   plaintext += ch;
		   i++;
		}
	} // while
   return plaintext;
}

function comprobarHora(hora, mensaje){
	if ( isNaN(hora.value) || (hora.value>23) || (hora.value<0)){
		alert(mensaje);
		hora.value="";
		hora.focus();
		return false;
	}else return true;
}

function esEntero(campo, mensaje) {
    if (campo.value != "") {
		if (isNaN(campo.value) || campo.value != parseInt(campo.value)) {
			alert(mensaje);
            campo.value="";
			campo.focus();
			return false;
		} else {
			return true;
		}
	}
}

function esEnteroMayorQue0(campo, mensaje)
{
	if (campo.value != "") {
		if (isNaN(campo.value) || campo.value < 0) {
			alert(mensaje);
			campo.value="";
			campo.focus();
			return false;
		} else {
			campo.value = parseInt(campo.value);
			return true;
		}
	}
}

//retorna true si se trata de un entero o float con 2 decimales
function esFloat(valor)
{
	var regExpFloat = /^\d{1,}$|^\d{1,}\.\d{1,2}$/;
	return regExpFloat.test(valor);
}

function esDosisValida(dosis)
{
	var regExpFloat = /^\d{1,7}$|^\d{1,7}\.$|^\d{1,7}(\.\d{1,3})?$|^\*$/;
	return regExpFloat.test(dosis);
}

function numObligatorioNoCero(campo, mensaje)
{
	if ( campo.value=="" || isNaN(campo.value) || campo.value<=0){
		alert(mensaje);
		campo.value="";
		campo.focus();
		return false;
	} else {
		return true;
	}
}
function numObligatorio(campo, mensaje)
{
	if ( campo.value=="" || isNaN(campo.value) ){
		alert(mensaje);
		campo.value="";
		campo.focus();
		return false;
	}else return true;
}

/** Función para mostrar la capa de progreso en vantanas "popup" */
function creaProcesando(texto, id) {
	if (document.getElementById("disableAplicacion") == null
			&& (!document.body.id || document.body.id == "")) {
		document.body.id = "disableAplicacion";
	}
	if (arguments.length == 1) {
		id = "procesandoLoader";
	}
	document.write("<div id='" + id + "' class='procesandoLoader'><div><span>"
			+ texto + "</span><div class='dots'></div></div></div>");
}

function muestraProcesando(id) {
	if (arguments.length == 0) {
		id = "procesandoLoader";
	}
	if (document.getElementById(id)) {
		document.getElementById(id).style.display="inline";
	}
	if (document.getElementById("disableAplicacion")) {
		document.getElementById("disableAplicacion").style.opacity = ".60";
		document.getElementById("disableAplicacion").style.pointerEvents = "none";
		document.getElementById("disableAplicacion").style.userSelect = "none";
	}
}

function ocultaProcesando(id) {
	if (arguments.length == 0) {
		id = "procesandoLoader";
	}
	if (document.getElementById(id)) {
		document.getElementById(id).style.display="none";
	} else if(window.parent.document.getElementById(id)){
		window.parent.document.getElementById(id).style.display="none";
	}
	if (document.getElementById("disableAplicacion")) {
		document.getElementById("disableAplicacion").style.opacity = "1";
		document.getElementById("disableAplicacion").style.pointerEvents = "auto";
		document.getElementById("disableAplicacion").style.userSelect = "auto";
	} else if(window.parent.document.getElementById("disableAplicacion")) {
		window.parent.document.getElementById("disableAplicacion").style.opacity = "1";
		window.parent.document.getElementById("disableAplicacion").style.pointerEvents = "auto";
		window.parent.document.getElementById("disableAplicacion").style.userSelect = "auto";
	}
}

function cargaOrdenaciones(){
	if(window.parent.reportCriteriosOrdenacionCargado){

		//Resetear los criterios de ordenacion que pueda
		//window.parent.document.frames('ordenacionListados').document.reportCriteriosOrdenacionForm.camposOrigen.options.length=0 ;
		var ordenacionListados = window.parent.document.getElementById('ordenacionListados');
		var camposOrigen = ordenacionListados.contentDocument.getElementById('camposOrigen');
		camposOrigen.options.length=0;
		var camposDestino = ordenacionListados.contentDocument.getElementById('camposDestino');
		camposDestino.options.length=0;
		var orden = document.forms[0].criteriosOrdenacion.value;
		if(orden != ""){
			window.parent.ocultarOrdenacion("N");
			var listaOrdenacion = orden.split(":");
			for(var i=0;i<listaOrdenacion.length;i++){
				var anOption = document.createElement("OPTION");
				//window.parent.document.frames('ordenacionListados').document.reportCriteriosOrdenacionForm.camposOrigen.options.add(anOption);
				camposOrigen.options.add(anOption);
				var valorTexto=listaOrdenacion[i].split("@");
				anOption.innerText = valorTexto[1];
				anOption.value = valorTexto[0];
			}
		}
	}else{
		//Para que de tiempo a cargar el contenido del iframe
		setTimeout("cargaOrdenaciones()",250);
	}
}

function acciones(webContext, titulo, filtroHistorico){
	//REferencias listado para buscador de historicos
	window.parent.filtroHistorico = filtroHistorico;
	window.parent.document.all.historicosC.style.display='block';
	window.parent.document.all.criteriosSeleccionTexto.innerHTML='&nbsp;<b>'+titulo+'</b>';
	//Activar el boton de imprimir
	window.parent.document.getElementById("imprimirButton").disabled=false;
	if(document.forms[0].accion.value=="lanzaImpresion"){
      	var accionOld = document.forms[0].action;

		if(window.parent.document.criteriosSeleccion.imprimirCriterios.checked){
			if(accionOld.indexOf("?") == -1 ){
				accionOld = accionOld+"?IMPRIMIRCRITERIOS=si";
			} else {
				accionOld = accionOld+"&IMPRIMIRCRITERIOS=si";
			}
		}
		//Especifico para el listado de hoja de prescripcion medica de VH.
		if(document.forms[0].variante != null){
			if(accionOld.indexOf("?") == -1 ){
				accionOld = accionOld+"?VARIANTE="+document.forms[0].variante.value;
			} else {
				accionOld = accionOld+"&VARIANTE="+document.forms[0].variante.value;
			}
		}
		windowOpen('','_formtarget','width=900,height=800,left=0,top=0,menubar=no');
      	document.forms[0].action = webContext+"/servicios/GeneradorListados.jsp?listadoAction="+accionOld;
		document.forms[0].target="_formtarget";
		document.forms[0].accion.value="imprimir";
		document.forms[0].submit();
        document.forms[0].action = accionOld;

	}else if(document.forms[0].accion.value=="error"){
		location.hash="#errores";
	}
}

function accionesSinImprimirCriterios(webContext, titulo, filtroHistorico){
	//REferencias listado para buscador de historicos
	window.parent.filtroHistorico = filtroHistorico;
	window.parent.document.all.historicosC.style.display='none';
	window.parent.document.all.criteriosSeleccionTexto.innerHTML='&nbsp;<b>'+titulo+'</b>';
	//Activar el boton de imprimir
	window.parent.document.all.imprimirButton.disabled=false;
	if(document.forms[0].accion.value=="lanzaImpresion"){
      	var accionOld = document.forms[0].action;

		//Especifico para el listado de hoja de prescripcion medica de VH.
		if(document.forms[0].variante != null){
			if(accionOld.indexOf("?") == -1 ){
				accionOld = accionOld+"?VARIANTE="+document.forms[0].variante.value;
			} else {
				accionOld = accionOld+"&VARIANTE="+document.forms[0].variante.value;
			}
		}
		windowOpen('','_formtarget','width=800,height=600,left=0,top=0,menubar=no');
      	document.forms[0].action = webContext+"/servicios/GeneradorListados.jsp?listadoAction="+accionOld;
		document.forms[0].target="_formtarget";
		document.forms[0].accion.value="imprimir";
		document.forms[0].submit();
        document.forms[0].action = accionOld;

	}else if(document.forms[0].accion.value=="error"){
		location.hash="#errores";
	}
}

// Importar wz_tooltip.js para que funcione el tip.
function creaImprimirIcono(top, left, tip) {
	document.write("<div class=\"fa-stack form_collapsable_icon no_print\" onclick=\"javascript:imprimePantalla(window);\""
			+ " id=\"iconoImprimir\" onmouseover=\"Tip('" + tip + "');\" style=\"position: absolute; top: " + top + "; left: " + left + ";\">"
			+ "<i class=\"fa fa-square fa-stack-2x darkcyan\"></i><i class=\"fa-solid fa-display fa-stack-1x fa-inverse\"></i></div>");
}

function imprimirFicha(webContext, urlTarget) {
	if (urlTarget != null) {
		urlTarget = webContext + "/servicios/GeneradorListados.jsp?listadoAction="+urlTarget;
		windowOpen(urlTarget, null, "titlebar=0,status=0,menubar=0,width=750,height=550,left=10,top=10");
	}
}

function imprimirFichaVariante(urlTarget) {
	if (urlTarget != null) {
		windowOpen(urlTarget, null, "titlebar=0,status=0,menubar=0,width=750,height=550,left=10,top=10");
	}
}

function imprimeElemento(webContext) {
	windowOpen(webContext + '/servicios/imprimirProgreso.jsp', '', 'width=750,height=550,left=10,top=10');
}


/**
 * Trunca valores con coma flotante a 2 decimales, poniendolos solo si se necesita
 * NOTA: Se podria especificar la cantidad de decimales usando 10^n, en lugar de 100
 */
function truncarFloat(obj) {
		if (obj.value == '') return;
		if (isNaN(obj.value)) {
			vDosis = 0;
		}
		else {
			vDosis = parseFloat(obj.value);
		}

		obj.value = Math.round(vDosis*100)/100;		
}

/** Devuelve 0 si el valor no es un número positivo * 	
 * @param obj
 * @return
 */
function floatPositivo(obj) {
	if (obj.value == '') return;
	if (isNaN(obj.value) || trim(obj.value) == '' || obj.value < 0) {
		vDosis = 0;
	}
	else {		
		vDosis = parseFloat(obj.value);
	}

	obj.value = Math.round(vDosis*100)/100;
}

/**
 * A partir de los milisegundos devuelve la fecha formateada como dd/mm/yyyy, hh:mm:ss
 */
function fechaFormateada(fechaMilisegundos){
	var fecha = new Date();
	fecha.setTime(fechaMilisegundos);
	var dia = fecha.getDate()+"";
	if (dia.length == 1){
		dia = "0"+dia;
	}
	var mes = (fecha.getMonth()+1)+"";
	if (mes.length == 1){
		mes = "0"+mes;
	}
	var any = fecha.getFullYear()+"";
	var hora = fecha.getHours()+"";
	if (hora.length == 1){
		hora = "0"+hora;
	}
	var minutos = fecha.getMinutes()+"";
	if (minutos.length == 1){
		minutos = "0"+minutos;
	}
	var segundos = fecha.getSeconds()+"";
	if (segundos.length == 1){
		segundos = "0"+segundos;
	}

	return dia+"/"+mes+"/"+any+", "+hora+":"+minutos+":"+segundos;
}

function removeClassName (elem, className) {
	elem.className = elem.className.replace(className, "").trim();
}

function addCSSClass (elem, className) {
	removeClassName (elem, className);
	elem.className = (elem.className + " " + className).trim();
}

function stripedTable() {
	if (document.getElementById && document.getElementsByTagName) {
		var allTables = document.getElementsByTagName('table');
		if (!allTables) { return; }

		for (var i = 0; i < allTables.length; i++) {
			if (allTables[i].className.match(/[\w\s ]*scrollTable[\w\s ]*/)) {
				var trs = allTables[i].getElementsByTagName("tr");
				for (var j = 0; j < trs.length; j++) {
					removeClassName(trs[j], 'alternateRow');
					addCSSClass(trs[j], 'normalRow');
				}
				for (var k = 0; k < trs.length; k += 2) {
					removeClassName(trs[k], 'normalRow');
					addCSSClass(trs[k], 'alternateRow');
				}
			}
		}
	}
}

function checkEmail(x)
{
	if(x=="") return true;
	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(x)) return true;
	else return false;
}

// Valida si un número es entero.
function validarEntero(objNumero) {
  var txt = objNumero.value;
  if (isNaN(txt)) {
    return false;
  } else {
    if(parseInt(txt) != parseFloat(txt)) {
      return false;
    }
  }
  return true;
}

// Valida que un número decimal tiene el número de decimales pasado por parámetro.
function validarDecimales(valor, decimales){

  	// Si hemos pasado un número entero no lo validamos.
    if( valor == parseInt(valor) ){
      return true;
    }

  	var numDecimales = valor.substring(valor.indexOf('.') + 1, valor.length);
	if (numDecimales.length > decimales)  {
    	return false;
    }
    else {
    	return true;
    }
}

// Redondea un número al número de decimales pasado por parámetro.
function redondearNumero(num, dec) {

	if(num==null) return num;
	if(dec==null) return num;

	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

//Trunca un número al número de decimales pasado por parámetro.
function truncarNumero(num, dec) {

	if(num==null) return num;
	if(dec==null) return num;

	var result = Math.floor(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}


function cortaDecimales(valor, num) {

	/*
	 * cortaDecimales(1.1399, 0) -> "1"
	 * cortaDecimales(1.1399, 1) -> "1."
	 * cortaDecimales(1.1399, 2) -> "1.1"
	 * cortaDecimales(1.1399, 3) -> "1.13"
	 * cortaDecimales(1.1399, 4) -> "1.139"
	 * cortaDecimales(1.1399, 10) -> "1.1399"
	 */
	
	if(valor == null) {
    	return "";
    }
    valorCad = valor+"";
    if (valorCad.length < num || valorCad.lastIndexOf('.') == -1) {
		return valorCad;
    } else {
      	sepa = valorCad.lastIndexOf('.');
        return valorCad.substring(0,sepa + num);
    }
}

//Returns the given word with the first letter in capital.
function capitalize(word){
	return word.charAt(0).toUpperCase() + word.slice(1);
}

// Deshabilita un boton controlando que no sea nulo evitando asi errores inesperados de javascript
function deshabilitaBoton(nombre) {
	boton = eval("document.all."+nombre);
	if (boton != null) {
		boton.disabled = true;
	}
}

//Habilita un boton controlando que no sea nulo evitando asi errores inesperados de javascript
function habilitaBoton(nombre) {
	boton = eval("document.all."+nombre);
	if (boton != null && boton.disabled) {
		boton.disabled = false;
	}
}

//función para ejecutar una pausa
function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
		  break;
		}
	  }
	}

/*
 * Date Format 1.2.2
 * (c) 2007-2008 Steven Levithan <stevenlevithan.com> http://blog.stevenlevithan.com/archives/date-time-format
 * MIT license
 * Includes enhancements by Scott Trenda <scott.trenda.net> and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 * ejemplo de utilizaciï¿½n
	var now = new Date();
	now.format("M/dd/yy");
	// Devuelve, p.e., 6/09/07
    now.format("siliconDefDate");
    //devuelve, p.e., 06/09/2007
	dd/MM/yyyy HH|hh:mm:ss
 */
var dateFormat = function () {
	var	token = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && (typeof date == "string" || date instanceof String) && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date();
		if (isNaN(date)) throw new SyntaxError("invalid date");
		
		if (!dF.masks) throw new SyntaxError("mask not defined");

		if (!dF.masks) throw new SyntaxError("mask not defined");
		
		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			M = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			m = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				M:    M + 1,
				MM:   pad(M + 1),
				MMM:  dF.i18n.monthNames[M],
				MMMM: dF.i18n.monthNames[M + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				m:    m,
				mm:   pad(m),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Introducimos el método 'format' a la función
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

/**  FUNCION QUE RETORNA UN OBJETO DATE A PARTIR DE UN STRING + FORMATO */
/* para llamarla, se usa el método getDate(<cadena>, <formato>); y retorna un objeto Date de javascript*/

/** year	: /yyyy/ */
var y4 = "([0-9]{4})";
/** year	: /yy/ */
var y2 = "([0-9]{2})";
/** index year */
var yi = -1;

/** month	: /MM/ */
var M2 = "(0[1-9]|1[0-2])";
/** month	: /M/ */
var M1 = "([1-9]|1[0-2])";
/** index month */
var Mi = -1;

/** day		: /dd/ */
var d2 = "(0[1-9]|[1-2][0-9]|30|31)";
/** day		: /d/ */
var d1 = "([1-9]|[1-2][0-9]|30|31)";
/** index day */
var di = -1;

/** hour	: /HH/ */
var H2 = "([0-1][0-9]|20|21|22|23)";
/** hour	: /H/ */
var H1 = "([0-9]|1[0-9]|20|21|22|23)";
/** index hour */
var Hi = -1;

/** minute	: /mm/ */
var m2 = "([0-5][0-9])";
/** minute	: /m/ */
var m1 = "([0-9]|[1-5][0-9])";
/** index minute */
var mi = -1;

/** second	: /ss/ */
var s2 = "([0-5][0-9])";
/** second	: /s/ */
var s1 = "([0-9]|[1-5][0-9])";
/** index month */
var si = -1;

var regexp;

/**
 * Devuelve las horas que hay entre dos fechas
 * @param fechaA
 * @param fechaB
 * @returns en positivo o negativo las horas de diferencia
 */
function getHoras(fechaA, fechaB){	
	var horas = ((fechaA.valueOf() - fechaB.valueOf())/1000/60/60);
	return horas;
}

function compareDate(inicio, fin) {
    if (inicio.getTime() > fin.getTime() ) {
		return 1;
    } else if (inicio.getTime() < fin.getTime() ) {
		return -1;
    } else {
		return 0;
    }
  }

function getDate(dateString, formatString){
  if(validateDate(dateString, formatString)) {
	var now = new Date();
	var vals = regexp.exec(dateString);
	var index = validateIndex(formatString);
	var year = index[0]>=0?vals[index[0] + 1]:now.getFullYear();
	var month = index[1]>=0?(vals[index[1] + 1]-1):now.getMonth();
	var day = index[2]>=0?vals[index[2] + 1]:now.getDate();
	var hour = index[3]>=0?vals[index[3] + 1]:"";
	var minute = index[4]>=0?vals[index[4] + 1]:"";
	var second = index[5]>=0?vals[index[5] + 1]:"";

	var validate;

	if (hour == "")
	  validate = new Date(year, month, day);
	else
	  validate = new Date(year, month, day, hour, minute, second);

	if(validate.getDate()==day) return validate;

  }
  alert("wrong date");
}


function validateDate(dateString, formatString){
  var dateString = trim(dateString);
  if(dateString=="") return false;
  var reg	=	formatString;
  reg	=	reg.replace(/yyyy/, y4);
  reg	=	reg.replace(/yy/, y2);
  reg	=	reg.replace(/MM/, M2);
  reg	=	reg.replace(/M/, M1);
  reg	=	reg.replace(/dd/, d2);
  reg	=	reg.replace(/d/, d1);
  reg	=	reg.replace(/HH/, H2);
  reg	=	reg.replace(/H/, H1);
  reg	=	reg.replace(/mm/, m2);
  reg	=	reg.replace(/m/, m1);
  reg	=	reg.replace(/ss/, s2);
  reg	=	reg.replace(/s/, s1);
  reg	=	new RegExp("^"+reg+"$");
  regexp = reg;
  return reg.test(dateString);
}

function validateIndex(formatString){

  var ia = new Array();
  var i = 0;
  yi	=	formatString.search(/yyyy/);
  if ( yi < 0 ) yi = formatString.search(/yy/);
  if (yi >= 0) {
	ia[i] = yi;
	i++;
  }

  Mi	=	formatString.search(/MM/);
  if ( Mi < 0 ) Mi = formatString.search(/M/);
  if (Mi >= 0) {
	ia[i] = Mi;
	i++;
  }

  di	=	formatString.search(/dd/);
  if ( di < 0 ) di = formatString.search(/d/);
  if (di >= 0) {
	ia[i] = di;
	i++;
  }

  Hi	=	formatString.search(/HH/);
  if ( Hi < 0 ) Hi = formatString.search(/H/);
  if (Hi >= 0) {
	ia[i] = Hi;
	i++;
  }

  mi	=	formatString.search(/mm/);
  if ( mi < 0 ) mi = formatString.search(/m/);
  if (mi >= 0) {
	ia[i] = mi;
	i++;
  }

  si	=	formatString.search(/ss/);
  if ( si < 0 ) si = formatString.search(/s/);
  if (si >= 0) {
	ia[i] = si;
	i++;
  }

  var ia2 = new Array(yi, Mi, di, Hi, mi, si);

  for(i=0; i<ia.length-1; i++)
	for(j=0;j<ia.length-1-i;j++)
		if(ia[j]>ia[j+1]) {
			temp=ia[j];
			ia[j]=ia[j+1];
			ia[j+1]=temp;
		}

  for (i=0; i<ia.length ; i++)
    for (j=0; j<ia2.length; j++)
	  if(ia[i]==ia2[j]) {
		ia2[j] = i;
	  }

  return ia2;
}


function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * Redondea la dosis a tres decimales
 * @return
 */
function redondearDosis (dosis) {
	if (dosis == null || dosis =="") {
		return "";
	} else {
		return Math.round(dosis*1000)/1000; 
	}
}    

function muestraDecimales(){
	document.getElementById("dosisAdministrada").value = document.getElementById("dosisAdministradaSinRedondear").value;	
	input=document.getElementById('dosisAdministrada');
	if (input.value != null && input.value != "" && input.value != "*"){
		if(typeof document.selection != 'undefined' && document.selection){
			tex=input.value;
			input.value='';
			input.focus();
			var str = document.selection.createRange();
			input.value=tex;
			str.move('character', 0);
			str.moveEnd("character", input.value.length-0);
			str.select();
		} else if(typeof input.selectionStart != 'undefined'){
			input.setSelectionRange(0,input.value.length);
			input.focus();
		}
	}
}

function ocultaDecimales(dosisAntesChange){
	// Pasamos el valor del campo tal cual lo haya indicado el usuario al campo hidden
	var dosisAux = document.getElementById("dosisAdministrada").value;
	if (dosisAux != null && dosisAux != "" && dosisAux != "*"){ 
		// Modificamos el valor mostrado en pantalla para mostrar ï¿½nicamente 3 decimales
		var dosis = $().stringToNumber(document.getElementById('dosisAdministrada').value);
		dosis = redondearNumero(dosis,3);
		dosis = $().getFormattedValue(dosis);
		if (dosis != dosisAntesChange){ // Si se ha modificado la dosis, se actualiza el valor del campo hidden que contiene la dosis sin redondear
			document.getElementById("dosisAdministradaSinRedondear").value = dosisAux;
		}
		document.getElementById("dosisAdministrada").value = dosis;
	}
}

function manejadorErrores(msg, exc) {
	if (exc.name.includes('dwr.engine.http.500')) {
		window.top.location.replace(dwr.engine._contextPath + "/Login.jsp");
	} else {
		alert('La sesion ha caducado');
		window.close();
	}
}

function toolTipObs(observaciones) {
	try {
		Tip(observaciones, LEFT, true, FADEIN, 400, WIDTH, 300);
	} catch(e) {}
}

//Funcion indexOf para arrays. Disponible a partir de la version 1.6 de javascript (IE 9 o superior)
Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
  
  var entityMap = {
		    "&": "&amp;",
		    "<": "&lt;",
		    ">": "&gt;",
		    '"': "&quot;",
		    "'": "&#39;",
		    "/": "&#x2F;"
		  };
  
  var revertBR = {
		    "&lt;br&gt;": "<br>",
		    "&lt;&#x2F;br&gt;": "<br>",
		    "&lt;br&#x2F;&gt;": "<br>"
		  };

  function escapeHtml(string) {
	  var patternExclude = /\b<\/?[a-z]+\b>/ig
	  var stringEscaped = String(string).replace(/[&<>"'\/]/g, function (s) {
		  return entityMap[s];
	  });
	  
	  // Deshacemos la conversión de los saltos de linea
	  return String(stringEscaped).replace(/&lt;(&#x2F;)?br(&#x2F;)?&gt;/ig, function (s2) {
		  return revertBR[s2.toLowerCase()];
	  });
  }
  
  // Recupera el alto y ancho de la ventana.
  function getHeight() {
	var h = 0;
	if (window.innerHeight) {
		h = window.innerHeight;
	} else if (window.document.documentElement
			&& window.document.documentElement.clientHeight) {
		h = window.document.documentElement.clientHeight;
	} else if (document.body) {
		h = window.document.body.clientHeight;
	} else {
		h = window.dialogHeight;
	}
	return h;
  }
  function setHeight(h) {
		if (window.innerHeight) {
			window.innerHeight = h;
		} else if (window.document.documentElement
				&& window.document.documentElement.clientHeight) {
			window.document.documentElement.clientHeight = h;
		} else if (document.body) {
			window.document.body.clientHeight = h;
		} else {
			window.dialogHeight = h;
		}
	  }
  function getWidth() {
	var w = 0;
	if (window.innerWidth) {
		w = window.innerWidth;
	} else if (window.document.documentElement
			&& window.document.documentElement.clientWidth) {
		w = window.document.documentElement.clientWidth;
	} else if (document.body) {
		w = window.document.body.clientWidth;
	} else {
		w = window.dialogWidth;
	}
	return w;
  }
  function setWidth(w) {
	if (window.innerWidth) {
		window.innerWidth = w;
	} else if (window.document.documentElement
			&& window.document.documentElement.clientWidth) {
		window.document.documentElement.clientWidth = w;
	} else if (document.body) {
		window.document.body.clientWidth = w;
	} else {
		window.dialogWidth = w;
	}
	return w;
  }

  /*
  Esta funcion estaba en 'dialog.js' (se utiliza mas de 100 veces en toda la aplicación).
  El primer argumento es la URL, el segundo es el tarjet (Aunque no se le pasa nunca en ninguna de sus llamadas, no se utiliza este parametro).
  Esta función crea un elemento html 'a', se establece el atributo href y después hace clic cobre el.
  */
  //TODO Probar de substituir el código por una redireccion sencilla sin tener que crear elementos. --> se propone utilitzar el método "windowReplace" que parece mas limpio
  function goToURL() {
		p_strURL = addToken(arguments[0]);
		p_target = arguments[1];
		
		var oLink = document.createElement("A");
		document.body.insertAdjacentElement('beforeEnd', oLink);
		
		oLink.setAttribute('href',p_strURL);
		
		if ((p_target) && (p_target!="")) {
			oLink.setAttribute('target',p_target);
		} else {
			oLink.target = window.name;
		}
		oLink.click();
  }
  
  function calculateIframeTabHeight(tab){
	  var currentIframeHeight = jQuery(window).height();
	  
	  var offsets = document.getElementById('tabNavContainer').getBoundingClientRect();  
	  var top = offsets.top;
	  	  
	  var offset = top + 120;
	  if(tab.tabPlus!=""){
		  offset = offset + tab.getHeightTabPlus(); //(form_buttons_section height);
	  }
	  
	  return currentIframeHeight - offset- 50;
  }
 
  function checkAccesKey (e) {
    if ((e.metaKey || e.altKey) && ( String.fromCharCode(e.which).toLowerCase() === 's') ) {
    	window.parent.suspender();
    } else if ((e.metaKey || e.altKey) && ( String.fromCharCode(e.which).toLowerCase() === 'r') ) {
    	window.parent.reactivar();
    } else if ((e.metaKey || e.altKey) && ( String.fromCharCode(e.which).toLowerCase() === 'm') ) {
    	window.parent.validarMonitorizacion();
    } else if ((e.metaKey || e.altKey) && ( String.fromCharCode(e.which).toLowerCase() === 'v') ) {
    	window.parent.validar();
    } else if ((e.metaKey || e.altKey) && ( String.fromCharCode(e.which).toLowerCase() === 'c') ) {
    	window.parent.cerrarTratamientos();
    }
}
  
  function fixFormAction(idForm) {
	  return encodeURI(addToken(document.getElementById(idForm).action));
  }
  
  function setBreadcumbURL(url){
	  var element = $(".breadcumb_element:last", parent.document);
	  if(url){		  		  
		  element.addClass("breadcumb_link");
		  element.on("click", 
				function() {
			  		windowReplace(url,null);
				}
		  );
	  } else {
	  	element.off("click");
	  	element.removeClass("breadcumb_link");			  				  
	  }	  
  }
  
  /**
   * Función que establece el titulo en el breadcumb (En caso que exista.)
   */
  function setBreadcumbText(breadcumbText) {
	  var breadcumb = getBreadcumb();
	  // Solo en caso de encontrarlo lo modifica
	  if (breadcumb != undefined){
		// Modificar el texto del breadcrumb
		  breadcumb.innerHTML = breadcumbText;
	  }
  }
  
  /**
   * Función que obtiene el titulo en el breadcumb (En caso que exista.)
   */
  function getBreadcumbText() {
	  var breadText = undefined;
	  var breadcumb = getBreadcumb();
	  // Solo en caso de encontrarlo lo obtiene
	  if (breadcumb != undefined){
		  breadText = breadcumb.innerHTML;
	  }
	  return breadText;
  }
  
  /**
   * Función que obtiene el elemento 'header_breadcrumb' en los documentos padres.
   * Esto permite acceder al elemento incluso si está anidado en un iframe 
   * o múltiples niveles de documentos padres.
   * En caso de no encontrarlo, se devuelve undefined.
   */
function getBreadcumb(){
	//Probamos el primer nivel
    let breadcrumb = document.getElementById('header_breadcrumb');
    if(breadcrumb){
    	return breadcrumb;
    }
    // Límite máximo de intentos para buscar el elemento en los padres para blindar el bucle infinito
    let maxAttempts = 10; 

    // Verificar si el elemento existe en el documento actual
    if (!breadcrumb) {
        let currentWindow = window;
        let attempts = 0;

        while (currentWindow !== currentWindow.parent && attempts < maxAttempts) {
            currentWindow = currentWindow.parent;
            breadcrumb = currentWindow.document.getElementById('header_breadcrumb');

            // Si se encuentra, detener el bucle
            if (breadcrumb) {
                return breadcrumb;
            }

            attempts++;
        }
    }

    return undefined;
}

function formatXml(xml) {
	var formatted = '';
	var reg = /(>)(<)(\/*)/g;
	xml = xml.replace(reg, '$1\r\n$2$3');
	var pad = 0;
	$.each(xml.split('\r\n'), function(index, node) {
		var indent = 0;
		if (node.match(/.+<\/\w[^>]*>$/)) {
			indent = 0;
		} else if (node.match(/^<\/\w/)) {
			if (pad != 0) {
				pad -= 1;
			}
		} else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
			indent = 1;
		} else {
			indent = 0;
		}

		var padding = '';
		for (var i = 0; i < pad; i++) {
			padding += '  ';
		}

		formatted += padding + node + '\r\n';
		pad += indent;
	});

	return formatted;
}

function noop() {
	// No Operation
}

/**
 * Ajusta el font size del select si alguna opcion es mayor que maxLength
 *
 * @param {string} selector - Selector jQuery para el select
 * @param {number} maxLength - Longitud maxima permitida antes de cambiar el font size
 * @param {string} newFontSize - Valor de font size nuevo (ejemplo: "10px")
 */
function ajustarFontSizeSelectLargo(selector, maxLength, newFontSize) {	
  var $select = $(selector);
  var opcionLarga = false;

  // Recorrer todas las opciones y comprobar longitud de texto
  $select.find("option").each(function() {
    if ($(this).text().length > maxLength) {
      opcionLarga = true;
      return false; // Salir del bucle
    }
  });

  // Cambiar font size si hay alguna opcion demasiado larga
  if (opcionLarga) {
	
    $select.css("font-size", newFontSize);
  }
  
}