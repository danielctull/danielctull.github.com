var MINIMUM_FONT = "10";
var UNITS = "";

function elementFontSize(element)
{
    var fontSize = MINIMUM_FONT; 

    if (document.defaultView)
    {
        fontSize = document.defaultView.getComputedStyle(element, null).getPropertyValue("font-size");
    }
    else if (element.currentStyle)
    {
        fontSize = element.currentStyle.fontSize;
    }

    if ((UNITS.length == 0) && (fontSize != MINIMUM_FONT))
    {
        UNITS = fontSize.substring(fontSize.length - 2, fontSize.length)
    }

    return parseFloat(fontSize);
}

function adjustFontSizeIfTooBig(idOfElement)
{
    var oTextBoxOuterDiv;
    var oTextBoxMiddleDiv;
    var oTextBoxInnerDiv;
    var oTextBoxOuterDiv = document.getElementById(idOfElement);
    
    if (oTextBoxOuterDiv)
    {
        oTextBoxMiddleDiv = getChildOfType(oTextBoxOuterDiv, "DIV", 0);
        if (oTextBoxMiddleDiv)
        {
            oTextBoxInnerDiv = getChildOfType(oTextBoxMiddleDiv, "DIV", 0);
            if (oTextBoxInnerDiv)
            {
                var oCachedHeight;
                if (windowsInternetExplorer)
                {
                    oCachedHeight = oTextBoxInnerDiv.style.height;
                    oTextBoxInnerDiv.style.height = "100px";
                }
                
                var clientHeight = oTextBoxInnerDiv.clientHeight;
                var specifiedHeight = clientHeight;
                if (oTextBoxMiddleDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxMiddleDiv.style.height);
                }
                else if (oTextBoxOuterDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxOuterDiv.style.height);
                }
                if ((windowsInternetExplorer) && (clientHeight == 100))
                {
                    clientHeight = specifiedHeight;
                }
                if (clientHeight > specifiedHeight)
                {
                    // compute smallest font in text box for scale purposes.
                    var smallestFontSize = 200;
                    
                    var aParaChildren = getParaDescendants(oTextBoxInnerDiv);
                    var oneLine = false;
                    for (i = 0; i < aParaChildren.length; i++)
                    {
                        var oParagraphDiv = aParaChildren[i];
                        var lineHeight = elementLineHeight(oParagraphDiv);
                        oneLine = oneLine || (lineHeight * 1.5 >= specifiedHeight);
                        if (oParagraphDiv.nodeName == "DIV")
                        {
                            var fontSize = elementFontSize(oParagraphDiv);
                            smallestFontSize = Math.min( smallestFontSize, fontSize );
                            for (j = 0; j < oParagraphDiv.childNodes.length; j++)
                            {
                                var oSpan = oParagraphDiv.childNodes[j];
                                if (oSpan.nodeName == "SPAN")
                                {
                                    fontSize = elementFontSize(oSpan);
                                    smallestFontSize = Math.min( smallestFontSize, fontSize );
                                }
                            }
                        }
                    }
                    var minimum = parseFloat(MINIMUM_FONT);
                    
                    var count = 0
                    while ((smallestFontSize > minimum) && (clientHeight > specifiedHeight) && (count < 10))
                    {
                        ++ count;
                        if (oneLine)
                        {
                            var oldWidth = parseInt(oTextBoxOuterDiv.style.width);
                            oTextBoxInnerDiv.style.width =
                                "" + oldWidth * Math.pow(1.05, count) + "px";
                        }
                        else
                        {
                            var scale = Math.max(0.95, minimum / smallestFontSize);
                            
                            // Scale all the fonts in the text box.
                            for (i = 0; i < aParaChildren.length; i++)
                            {
                                var oParagraphDiv = aParaChildren[i];
                                if (oParagraphDiv.nodeName == "DIV")
                                {
                                    var fontSize = elementFontSize(oParagraphDiv) * scale;
                                    oParagraphDiv.style.fontSize = fontSize + UNITS;
                                    oParagraphDiv.style.lineHeight = fontSize + UNITS;
                                    smallestFontSize = Math.min( smallestFontSize, fontSize );
                                    for (j = 0; j < oParagraphDiv.childNodes.length; j++)
                                    {
                                        var oSpan = oParagraphDiv.childNodes[j];
                                        if (oSpan.nodeName == "SPAN")
                                        {
                                            fontSize = elementFontSize(oSpan) * scale;
                                            oSpan.style.fontSize = fontSize + UNITS;
                                            oSpan.style.lineHeight = fontSize + UNITS;
                                            smallestFontSize = Math.min( smallestFontSize, fontSize );
                                        }
                                    }
                                }
                            }
                        }
                        
                        clientHeight = oTextBoxInnerDiv.clientHeight;
                    }
                }
                if (windowsInternetExplorer)
                {
                    oTextBoxInnerDiv.style.height = oCachedHeight;
                }
            }
        }
    }
}


function elementLineHeight(element)
{
    var lineHeight = MINIMUM_FONT; 
    
    if (document.defaultView)
    {
        lineHeight = document.defaultView.getComputedStyle(element, null).getPropertyValue("line-height");
    }
    else if (element.currentStyle)
    {
        lineHeight = element.currentStyle.lineHeight;
    }
    
    if ((UNITS.length == 0) && (lineHeight != MINIMUM_FONT))
    {
        UNITS = lineHeight.substring(lineHeight.length - 2, lineHeight.length)
    }
    
    return parseFloat(lineHeight);
}

function adjustLineHeightIfTooBig(idOfElement)
{
    var oTextBoxOuterDiv;
    var oTextBoxMiddleDiv;
    var oTextBoxInnerDiv;
    var oTextBoxOuterDiv = document.getElementById(idOfElement);
    
    if (oTextBoxOuterDiv)
    {
        oTextBoxMiddleDiv = getChildOfType(oTextBoxOuterDiv, "DIV", 0);
        if (oTextBoxMiddleDiv)
        {
            oTextBoxInnerDiv = getChildOfType(oTextBoxMiddleDiv, "DIV", 0);
            if (oTextBoxInnerDiv)
            {
                var oCachedHeight;
                if (windowsInternetExplorer)
                {
                    oCachedHeight = oTextBoxInnerDiv.style.height;
                    oTextBoxInnerDiv.style.height = "100px";
                }
                
                var clientHeight = oTextBoxInnerDiv.clientHeight;
                var specifiedHeight = clientHeight;
                if (oTextBoxMiddleDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxMiddleDiv.style.height);
                }
                else if (oTextBoxOuterDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxOuterDiv.style.height);
                }
                if ((windowsInternetExplorer) && (clientHeight == 100))
                {
                    clientHeight = specifiedHeight;
                }
                if (clientHeight > specifiedHeight)
                {
                    var adjusted = true;
                    var count = 0;
                    while ((adjusted) && (clientHeight > specifiedHeight) && (count < 10))
                    {
                        adjusted = false;
                        ++ count;
                        
                        // Scale all the line heights in the text box.
                        var aParaChildren = getParaDescendants(oTextBoxInnerDiv);
                        for (i = 0; i < aParaChildren.length; i++)
                        {
                            var oParagraphDiv = aParaChildren[i];
                            if (oParagraphDiv.nodeName == "DIV")
                            {
                                var fontSize = elementFontSize(oParagraphDiv);
                                var lineHeight = elementLineHeight(oParagraphDiv) * 0.95;
                                if (lineHeight >= (fontSize * 1.1))
                                {
                                    oParagraphDiv.style.lineHeight = lineHeight + UNITS;
                                    adjusted = true;
                                }
                                
                                
                                
                                for (j = 0; j < oParagraphDiv.childNodes.length; j++)
                                {
                                    var oSpan = oParagraphDiv.childNodes[j];
                                    if (oSpan.nodeName == "SPAN")
                                    {
                                        var fontSize = elementFontSize(oSpan);
                                        var lineHeight = elementLineHeight(oSpan) * 0.95;
                                        if (lineHeight >= (fontSize * 1.1))
                                        {
                                            oSpan.style.lineHeight = lineHeight + UNITS;
                                            var adjusted = true;
                                        }
                                    }
                                }
                            }
                        }
                        
                        clientHeight = oTextBoxInnerDiv.clientHeight;
                    }
                }
                if (windowsInternetExplorer)
                {
                    oTextBoxInnerDiv.style.height = oCachedHeight;
                }
            }
        }
    }
}

function adjustPositioningIfWrongSize(idOfElement, shrinkPadding, shrink)
{
    var oTextBoxOuterDiv;
    var oTextBoxMiddleDiv;
    var oTextBoxInnerDiv;
    var oTextBoxAlternateImage;
    var oImg;
    var adjustPositioning = false;
    var adjustmentPixels = 0;
    var oTextBoxOuterDiv = document.getElementById(idOfElement);
    if (oTextBoxOuterDiv)
    {
        oTextBoxMiddleDiv = getChildOfType(oTextBoxOuterDiv, "DIV", 0);
        if (oTextBoxMiddleDiv)
        {
            oTextBoxInnerDiv = getChildOfType(oTextBoxMiddleDiv, "DIV", 0);
            if (oTextBoxInnerDiv)
            {
                var oCachedHeight;
                if (windowsInternetExplorer)
                {
                    oCachedHeight = oTextBoxInnerDiv.style.height;
                    oTextBoxInnerDiv.style.height = "100px";
                }
                var clientHeight = oTextBoxInnerDiv.clientHeight;
                var specifiedHeight = clientHeight;
                if (oTextBoxMiddleDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxMiddleDiv.style.height);
                }
                else if (oTextBoxOuterDiv.style.height != "")
                {
                    specifiedHeight = parseFloat(oTextBoxOuterDiv.style.height);
                }
                if ((windowsInternetExplorer) && (clientHeight == 100))
                {
                    clientHeight = specifiedHeight;
                }
                if (clientHeight > specifiedHeight || 
                    specifiedHeight > clientHeight + shrinkPadding )
                {
                    adjustPositioning = true;
                    adjustmentPixels = clientHeight - specifiedHeight;
                    if (specifiedHeight > clientHeight)
                    {
                      if (! shrink)
                      {
                          adjustPositioning = false;
                      }
                      else
                      {
                          adjustmentPixels += shrinkPadding;
                      }
                      
                    }
                }
                if (windowsInternetExplorer)
                {
                    oTextBoxInnerDiv.style.height = oCachedHeight;
                }
            }
        }
    }
    
    if (adjustPositioning)
    {
        var currentOuterHeight = parseInt(oTextBoxOuterDiv.style.height);
        var newOuterHeight = currentOuterHeight + adjustmentPixels;
        if( newOuterHeight <= 0 )        {            newOuterHeight = 1;        }        oTextBoxOuterDiv.style.height = "" + newOuterHeight + "px";

        oFooterLayer = document.getElementById("footer_layer");
        if (oFooterLayer)
        {
            var currentYPos = parseInt(oFooterLayer.style.top);
            var newYPos = currentYPos + adjustmentPixels;
            oFooterLayer.style.top = "" + newYPos + "px";
        }

        oBodyLayer = document.getElementById("body_layer");
        if (oBodyLayer)
        {
            var currentBodyLayerHeight = parseInt(oBodyLayer.style.height);
            var newBodyLayerHeight = currentBodyLayerHeight + adjustmentPixels;
            oBodyLayer.style.height = "" + newBodyLayerHeight + "px";
        }

        oBodyContentDiv = document.getElementById("bodyContent");
        if (oBodyContentDiv)
        {
            var currentBodyContentHeight = parseInt(oBodyContentDiv.style.height);
            var newBodyContentHeight = currentBodyContentHeight + adjustmentPixels;
            oBodyContentDiv.style.height = "" + newBodyContentHeight + "px";
        }

        oNavLayer = document.getElementById("nav_layer");
        if(oNavLayer)
        {
            var currentNavLayerHeight = parseInt(oNavLayer.style.height);
            var diff = currentNavLayerHeight - currentBodyContentHeight;
            if ((diff > -10) && (diff < 10))
            {
                var newNavLayerHeight = currentNavLayerHeight + adjustmentPixels;
                oNavLayer.style.height = "" + newNavLayerHeight + "px";

                oNavBG = getChildOfType(oNavLayer, "DIV", 0);
                if (oNavBG)
                {
                    var currentNavBGHeight = parseInt(oNavBG.style.height);
                    var newNavBGHeight = currentNavBGHeight + adjustmentPixels;
                    oNavBG.style.height = "" + newNavBGHeight + "px";
                }
            }
        }

    }
}
var smallTransparentGif = "";
function fixupIEPNG(strImageID, transparentGif) 
{
    smallTransparentGif = transparentGif;
    if (windowsInternetExplorer)
    {
        var img = document.getElementById(strImageID);
        if (img)
        {
            var src = img.src;
            img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')";
            img.src = transparentGif;
            img.attachEvent("onpropertychange", imgPropertyChanged);
        }
    }
}

function getChildOfType(oParent, sNodeName, requestedIndex)
{
    var index = 0;
    for (i = 0; i < oParent.childNodes.length; i++)
    {
        if (oParent.childNodes[i].nodeName == sNodeName)
        {
            if (index == requestedIndex)
            {
                return oParent.childNodes[i];
            }
            else
            {
                index++;
            }
        }
    }
    return null;
}

function getParaDescendantsRec(oAncestor, aResultArray, index)
{
    if (index == -1)
    {
        if ((oAncestor.nodeName == "DIV") &&
            (oAncestor.className.lastIndexOf("paragraph") != -1))
        {
            aResultArray[aResultArray.length] = oAncestor;
        }
        else if ((oAncestor.nodeName == "DIV") ||
                 (oAncestor.nodeName == "LI") ||
                 (oAncestor.nodeName == "OL") ||
                 (oAncestor.nodeName == "UL"))
        {
            getParaDescendantsRec(oAncestor, aResultArray, 0);
        }
    }
    else
    {
        getParaDescendantsRec(oAncestor.childNodes[index], aResultArray, -1);
        if (index < (oAncestor.childNodes.length - 1))
        {
            getParaDescendantsRec(oAncestor, aResultArray, index + 1);
        }
    }
}

function getParaDescendants(oAncestor)
{
    var aResultArray = new Array();
    getParaDescendantsRec(oAncestor, aResultArray, -1);

    return aResultArray;
}

var windowsInternetExplorer = false;
function detectBrowser()
{
    windowsInternetExplorer = false;
    var appVersion = navigator.appVersion;
    if ((appVersion.indexOf("MSIE") != -1) &&
        (appVersion.indexOf("Macintosh") == -1))
    {
        windowsInternetExplorer = true;
    }
}

var inImgPropertyChanged = false;
function imgPropertyChanged()
{
    if ((window.event.propertyName == "src") && (! inImgPropertyChanged))
    {
        inImgPropertyChanged = true;
        var el = window.event.srcElement;
        if (el.src != smallTransparentGif)
        {
            el.filters.item(0).src = el.src;
            el.src = smallTransparentGif;
        }
        inImgPropertyChanged = false;
    }
}

function onPageLoad()
{
    detectBrowser();
    fixupIEPNG("id1", "CAWeb_files/transparent.gif");
    adjustLineHeightIfTooBig("id2");
    adjustFontSizeIfTooBig("id2");
    fixupIEPNG("id3", "CAWeb_files/transparent.gif");
    adjustPositioningIfWrongSize("id4", 50, 1);
    fixupIEPNG("id5", "CAWeb_files/transparent.gif");
    fixupIEPNG("id6", "CAWeb_files/transparent.gif");
    fixupIEPNG("id7", "CAWeb_files/transparent.gif");
    return true;
}

