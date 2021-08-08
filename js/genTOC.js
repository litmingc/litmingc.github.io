$(document).ready(function () {
  var $main = $("#jsGenTableOfContents");
  if($main.length<1) return;

  var $article = $(".post-body");
  var mark = [0, 0, 0, 0, 0, 0];
  var hTag = ["H1", "H2", "H3", "H4", "H5", "H6"];
  var minHead = 0;
  var maxHead = 7;
  (function setMark() {
    var index = 0;
    for (var i = 0; i < 6; ++i) {
      if ($article.children(hTag[i]).length > 0) {
        ++mark[i];
        if (i < minHead) minHead = i;
        if (i > maxHead) maxHead = i;
      }
    }
  })();
  var last = 0;
  var $tablep = $("#jsGenTableOfContents");
  var $tables = $article.children(":Header");
  var ulObj = document.createElement("ul");
  ulObj["HeadId"] = minHead;
  var ulList = [ulObj];
  addul($tables.toArray());
  $main[0].appendChild(ulObj);

  console.log(ulObj);

  function addul(tables) {
    console.log("ulList", ulList);
    console.log(parentid);
    if((tables.length<1) || (ulList.length<1)) return;
    console.log(tables);
    var nowtagName = tables[0].tagName;
    var headindex = hTag.indexOf(nowtagName);
    var parentid = ulList[ulList.length-1]["HeadId"];
    if (headindex == parentid) {
      addil(ulList[ulList.length-1], tables[0])
      tables.shift();  // 删除第一个元素
    }
    else if (headindex < parentid) {
      ulList.pop();
    }
    else if (headindex > parentid) {
      var newul = document.createElement("ul");
      newul["HeadId"] = headindex;
      ulList[ulList.length-1].appendChild(newul);
      ulList.push(newul);
    }
    addul(tables);
  }

  function addil(ulobj, headcon) {
    console.log(typeof(ulobj));
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.setAttribute('href',"#"+headcon.id);
    a.innerHTML = headcon.innerHTML;
    li.appendChild(a);
    ulobj.appendChild(li);
  }
});
