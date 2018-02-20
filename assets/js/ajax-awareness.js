/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Usage:
 * 1. Include this javascript file to ur controller jsp.
 * 2. Include this script within document ready in the above jsp: ImagePath = '<%=response.encodeURL(request.getContextPath())%>'+ '/images/ajax-loader.gif'; which is the path to an ajax loader image
 * 3. For every ajax request made there should be a data parameter containing the key(TargetComponentId) and value(CallerId) as describe below.
 *   jQuery.ajax({
 url: ajaxURL,
 dataType: "json",
 type: "POST",
 data: {
 TargetComponentId: CallerId
 },
 success: function(data, textStatus, jQXHr) {
 }
 });
 * "CallerId" is the element id where this ajax loader should be appended where TargetComponentId is the parameter key for the callerId included in this ajax request.
 * Note that "CalleId" can be any html element not necesarrily the element that initiated the ajax call.
 * ImagePath and TargetComponentId are javascript global variables once this javascript file is included to a page.
 *
 * @author  marcel
 */
window.TargetComponentId = 'TargetComponentId';
window.AjaxIndicatorId = '->ajax-indicator';
window.ImagePath = '';

$(document).ajaxSend(function(event, request, settings) {
    var dataValues = settings.data.split("&");
    for (i = 0; i < dataValues.length; i++) {
        var keyValue = dataValues[i];
        if (keyValue.split("=")[0] == window.TargetComponentId) {
            showAjaxLoader(keyValue.split("=")[1]);
            break;
        }
    }
});

$(document).ajaxComplete(function(event, request, settings) {
    var dataValues = settings.data.split("&");
    for (i = 0; i < dataValues.length; i++) {
        var keyValue = dataValues[i];
        if (keyValue.split("=")[0] == window.TargetComponentId) {
            hideAjaxLoader(keyValue.split("=")[1]);
            break;
        }
    }
});

var showAjaxLoader = function(component) {
    var targetComponentId = null;
    var message = null;
    if (typeof component === 'Object') {
        targetComponentId = component['id'];
        message = component['message'];
    } else {
        targetComponentId = component;
    }
    var targetComponent = document.getElementById(targetComponentId);
    var indicatorId = targetComponentId + window.AjaxIndicatorId;
    var span = document.createElement('span');
    $(span).attr('id', indicatorId);
    if (message !== null) {
        span.appendChild(document.createTextNode(message));//appends message before img
    }
    var img = document.createElement('img');
    $(img).attr('src', window.ImagePath);
    $(img).attr('alt', 'loading...');
    span.appendChild(img);

    if (targetComponent != null) {
    $(span).insertAfter(targetComponent);
    } else {
        $(span).attr('style', 'position:fixed;left: 50%;top: 12%;');
        document.body.append(span);
    }
};

var hideAjaxLoader = function(component) {
    var targetComponentId = null;
    var message = null;
    if (typeof component === 'Object') {
        targetComponentId = component['id'];
        message = component['message'];
    } else {
        targetComponentId = component;
    }
    var indicatorId = targetComponentId + window.AjaxIndicatorId;
    if (document.getElementById(indicatorId) != null) {
        $(document.getElementById(indicatorId)).remove();
    }
};
