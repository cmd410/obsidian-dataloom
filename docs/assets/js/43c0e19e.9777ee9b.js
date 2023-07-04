"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[414],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>b});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=s(r),f=a,b=p["".concat(c,".").concat(f)]||p[f]||d[f]||o;return r?n.createElement(b,l(l({ref:t},u),{},{components:r})):n.createElement(b,l({ref:t},u))}));function b(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=f;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:a,l[1]=i;for(var s=2;s<o;s++)l[s]=r[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},1431:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const o={},l="Tag cell",i={unversionedId:"features/cells/body/body-cell-tag",id:"features/cells/body/body-cell-tag",title:"Tag cell",description:"Description",source:"@site/docs/features/cells/body/body-cell-tag.mdx",sourceDirName:"features/cells/body",slug:"/features/cells/body/body-cell-tag",permalink:"/obsidian-dashboards/features/cells/body/body-cell-tag",draft:!1,editUrl:"https://github.com/trey-wallis/obsidian-dashboards/tree/master/docusaurus/docs/features/cells/body/body-cell-tag.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Number cell",permalink:"/obsidian-dashboards/features/cells/body/body-cell-number"},next:{title:"Text cell",permalink:"/obsidian-dashboards/features/cells/body/body-cell-text"}},c={},s=[{value:"Description",id:"description",level:2},{value:"Usage",id:"usage",level:2}],u={toc:s},p="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"tag-cell"},"Tag cell"),(0,a.kt)("h2",{id:"description"},"Description"),(0,a.kt)("p",null,"This cell renders a tag."),(0,a.kt)("p",null,"A tag belongs to a column. It can be assigned to multiple cells within a column."),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("p",null,"When the menu opens, you will see an input and a list of the column tags. Type a value into the input to filter the list of tags. If a tag with the value of the input doesn't exist, a ",(0,a.kt)("inlineCode",{parentName:"p"},"Create")," button will appear. Click the button or press ",(0,a.kt)("inlineCode",{parentName:"p"},"Enter")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"return")," to create the tag."),(0,a.kt)("p",null,"To add an existing tag, select any tag from the list. If a tag has already been choosen for the cell, the current tag will be updated with the one you have chosen."),(0,a.kt)("p",null,"To edit a tag, select the three dots button. The tag edit menu will appear. You may delete the tag by clicking ",(0,a.kt)("inlineCode",{parentName:"p"},"Delete"),". To choose a new color for the tag, click any of the color options."))}d.isMDXComponent=!0}}]);