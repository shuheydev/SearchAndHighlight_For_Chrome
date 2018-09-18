var ReplacerTagName = "searchandhighlight";

function HighlightWords(node, word, att) {

    if (node === undefined || !node) return;

    if (node.nodeName.toLowerCase() === ReplacerTagName && node.className == att) {
        return;
    }

    if (node.nodeName.toLowerCase() === "style")
        return;
    if (node.nodeName.toLowerCase() === "script")
        return;

    if (node.nodeName.toLowerCase() === "noscript")
        return;


    if (node.hasChildNodes()) {
        for (let childIdx = 0; childIdx < node.childNodes.length; childIdx++) {
            this.HighlightWords(node.childNodes[childIdx], word, att);
        }
    }

    if (node.nodeType == 3) {
        let searchPattern = '(' + word + ')';
        let regularExp = new RegExp(searchPattern, "gi");

        if ((nv = node.nodeValue) && (regs = regularExp.exec(nv))) {
            let match = document.createElement(ReplacerTagName);
            match.appendChild(document.createTextNode(regs[0]));
            let classList = att.split(' ');
            for (let classIdx = 0; classIdx < classList.length; classIdx++) {
                match.classList.add(classList[classIdx]);
            }

            let after = node.splitText(regs.index);
            after.nodeValue = after.nodeValue.substring(regs[0].length);
            node.parentNode.insertBefore(match, after);
        }
    }
}


function RemoveHighlights(node) {
    if (node === undefined || !node) return;

    if (node.hasChildNodes()) {
        for (let childIdx = 0; childIdx < node.childNodes.length; childIdx++) {
            this.RemoveHighlights(node.childNodes[childIdx]);
        }
    }

    if (node.nodeName.toLowerCase() === ReplacerTagName) {
        let parent = node.parentNode;

        let textNode = document.createTextNode(node.innerText);
        parent.replaceChild(textNode, node);
    }

    NormalizeTextNodes(node);
}


function NormalizeTextNodes(node) {
    if (node === undefined || !node) return;

    node.normalize();
    if (node.hasChildNodes()) {
        for (let childIdx = 0; childIdx < node.childNodes.length; childIdx++) {
            this.NormalizeTextNodes(node.childNodes[childIdx]);
        }
    }
}


//highlight
function highlight(target) {

    let bodyElem = document.getElementsByTagName("body")[0];

    //remove first.
    RemoveHighlights(bodyElem);

    if (target === "" || target === null)
        return;

    //then highlight.

    //split
    let splittedTarget = target.split(/\s+/gi);
    for (let wordIdx = 0; wordIdx < splittedTarget.length; wordIdx++) {
        let word = splittedTarget[wordIdx];

        if (word === "" || word === "\n" || word === undefined)
            continue;

        let escapedWord = RegexEscape(word);
        HighlightWords(bodyElem, escapedWord, "searchandhighlight-common searchandhighlight-find-color-" + (wordIdx % 8));
    }

    NormalizeTextNodes(bodyElem);
}



function RegexEscape(string) {
    return string.replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&'); // $&はマッチした部分文字列全体を意味します
}
