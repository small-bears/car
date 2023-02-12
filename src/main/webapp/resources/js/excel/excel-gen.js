/*require jszip.js FileSaver.js jquery*/

/* excel-gen.js

Client-Side JavaScript Code for creating Excel Spreadsheet tables from HTML Tables
Works on all browsers!!!!!

---------------
- MIT License -
---------------
Copyright 2018 ECSC, ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Author Paul Warren */

//Initial XLSX Generation assumes default Workbook with sheet1, sheet2 and sheet3 inside.  Will upgrade to be more flexible in future releases.

/**
* Excel Generator.
*
* Creates .xlsx from HTML Table.
*
*/
function ExcelGen(options) {
    //internal access to this
    me = this;

    this.defaultOptions = {
        "src_id": "",
        "type": "table",
        "show_header": false,
        "header_row": null,
        "body_rows": null
    }

    this.options = {};

    this.col_count = 0;
    this.columns = [];
    this.headers = [];
    this.rows = [];
    this.srcElem;

    this.static_components = {
        "_rels": {
            ".rels": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg0KPFJlbGF0aW9uc2hpcHMgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9wYWNrYWdlLzIwMDYvcmVsYXRpb25zaGlwcyI+PFJlbGF0aW9uc2hpcCBJZD0icklkMyIgVHlwZT0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9leHRlbmRlZC1wcm9wZXJ0aWVzIiBUYXJnZXQ9ImRvY1Byb3BzL2FwcC54bWwiLz48UmVsYXRpb25zaGlwIElkPSJySWQyIiBUeXBlPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvcGFja2FnZS8yMDA2L3JlbGF0aW9uc2hpcHMvbWV0YWRhdGEvY29yZS1wcm9wZXJ0aWVzIiBUYXJnZXQ9ImRvY1Byb3BzL2NvcmUueG1sIi8+PFJlbGF0aW9uc2hpcCBJZD0icklkMSIgVHlwZT0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9vZmZpY2VEb2N1bWVudCIgVGFyZ2V0PSJ4bC93b3JrYm9vay54bWwiLz48L1JlbGF0aW9uc2hpcHM+"
        },
        "docProps": {
            "app.xml": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg0KPFByb3BlcnRpZXMgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L2V4dGVuZGVkLXByb3BlcnRpZXMiIHhtbG5zOnZ0PSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9kb2NQcm9wc1ZUeXBlcyI+PEFwcGxpY2F0aW9uPk1pY3Jvc29mdCBFeGNlbDwvQXBwbGljYXRpb24+PERvY1NlY3VyaXR5PjA8L0RvY1NlY3VyaXR5PjxTY2FsZUNyb3A+ZmFsc2U8L1NjYWxlQ3JvcD48SGVhZGluZ1BhaXJzPjx2dDp2ZWN0b3Igc2l6ZT0iMiIgYmFzZVR5cGU9InZhcmlhbnQiPjx2dDp2YXJpYW50Pjx2dDpscHN0cj5Xb3Jrc2hlZXRzPC92dDpscHN0cj48L3Z0OnZhcmlhbnQ+PHZ0OnZhcmlhbnQ+PHZ0Omk0PjM8L3Z0Omk0PjwvdnQ6dmFyaWFudD48L3Z0OnZlY3Rvcj48L0hlYWRpbmdQYWlycz48VGl0bGVzT2ZQYXJ0cz48dnQ6dmVjdG9yIHNpemU9IjMiIGJhc2VUeXBlPSJscHN0ciI+PHZ0Omxwc3RyPlNoZWV0MTwvdnQ6bHBzdHI+PHZ0Omxwc3RyPlNoZWV0MjwvdnQ6bHBzdHI+PHZ0Omxwc3RyPlNoZWV0MzwvdnQ6bHBzdHI+PC92dDp2ZWN0b3I+PC9UaXRsZXNPZlBhcnRzPjxDb21wYW55PjwvQ29tcGFueT48TGlua3NVcFRvRGF0ZT5mYWxzZTwvTGlua3NVcFRvRGF0ZT48U2hhcmVkRG9jPmZhbHNlPC9TaGFyZWREb2M+PEh5cGVybGlua3NDaGFuZ2VkPmZhbHNlPC9IeXBlcmxpbmtzQ2hhbmdlZD48QXBwVmVyc2lvbj4xNC4wMzAwPC9BcHBWZXJzaW9uPjwvUHJvcGVydGllcz4=",
            "core.xml": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg0KPGNwOmNvcmVQcm9wZXJ0aWVzIHhtbG5zOmNwPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvcGFja2FnZS8yMDA2L21ldGFkYXRhL2NvcmUtcHJvcGVydGllcyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpkY3Rlcm1zPSJodHRwOi8vcHVybC5vcmcvZGMvdGVybXMvIiB4bWxuczpkY21pdHlwZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlLyIgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSI+PGRjOmNyZWF0b3I+SmF2YVNjcmlwdCBFeGNlbCBHZW5lcmF0b3I8L2RjOmNyZWF0b3I+PGNwOmxhc3RNb2RpZmllZEJ5PkphdmFTY3JpcHQgRXhjZWwgR2VuZXJhdG9yPC9jcDpsYXN0TW9kaWZpZWRCeT48ZGN0ZXJtczpjcmVhdGVkIHhzaTp0eXBlPSJkY3Rlcm1zOlczQ0RURiI+MjAxOC0wMS0xNVQxNzo0NjowNVo8L2RjdGVybXM6Y3JlYXRlZD48ZGN0ZXJtczptb2RpZmllZCB4c2k6dHlwZT0iZGN0ZXJtczpXM0NEVEYiPjIwMTgtMDEtMTVUMTc6NDg6MTZaPC9kY3Rlcm1zOm1vZGlmaWVkPjwvY3A6Y29yZVByb3BlcnRpZXM+"
        },
        "xl": {
            "_rels": {
                "workbook.xml.rels": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg0KPFJlbGF0aW9uc2hpcHMgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9wYWNrYWdlLzIwMDYvcmVsYXRpb25zaGlwcyI+PFJlbGF0aW9uc2hpcCBJZD0icklkMyIgVHlwZT0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy93b3Jrc2hlZXQiIFRhcmdldD0id29ya3NoZWV0cy9zaGVldDMueG1sIi8+PFJlbGF0aW9uc2hpcCBJZD0icklkMiIgVHlwZT0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy93b3Jrc2hlZXQiIFRhcmdldD0id29ya3NoZWV0cy9zaGVldDIueG1sIi8+PFJlbGF0aW9uc2hpcCBJZD0icklkMSIgVHlwZT0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy93b3Jrc2hlZXQiIFRhcmdldD0id29ya3NoZWV0cy9zaGVldDEueG1sIi8+PFJlbGF0aW9uc2hpcCBJZD0icklkNiIgVHlwZT0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9zaGFyZWRTdHJpbmdzIiBUYXJnZXQ9InNoYXJlZFN0cmluZ3MueG1sIi8+PFJlbGF0aW9uc2hpcCBJZD0icklkNSIgVHlwZT0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9zdHlsZXMiIFRhcmdldD0ic3R5bGVzLnhtbCIvPjxSZWxhdGlvbnNoaXAgSWQ9InJJZDQiIFR5cGU9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvdGhlbWUiIFRhcmdldD0idGhlbWUvdGhlbWUxLnhtbCIvPjwvUmVsYXRpb25zaGlwcz4="
            },
            "theme": {
                "theme1.xml": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg0KPGE6dGhlbWUgeG1sbnM6YT0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL2RyYXdpbmdtbC8yMDA2L21haW4iIG5hbWU9Ik9mZmljZSBUaGVtZSI+PGE6dGhlbWVFbGVtZW50cz48YTpjbHJTY2hlbWUgbmFtZT0iT2ZmaWNlIj48YTpkazE+PGE6c3lzQ2xyIHZhbD0id2luZG93VGV4dCIgbGFzdENscj0iMDAwMDAwIi8+PC9hOmRrMT48YTpsdDE+PGE6c3lzQ2xyIHZhbD0id2luZG93IiBsYXN0Q2xyPSJGRkZGRkYiLz48L2E6bHQxPjxhOmRrMj48YTpzcmdiQ2xyIHZhbD0iMUY0OTdEIi8+PC9hOmRrMj48YTpsdDI+PGE6c3JnYkNsciB2YWw9IkVFRUNFMSIvPjwvYTpsdDI+PGE6YWNjZW50MT48YTpzcmdiQ2xyIHZhbD0iNEY4MUJEIi8+PC9hOmFjY2VudDE+PGE6YWNjZW50Mj48YTpzcmdiQ2xyIHZhbD0iQzA1MDREIi8+PC9hOmFjY2VudDI+PGE6YWNjZW50Mz48YTpzcmdiQ2xyIHZhbD0iOUJCQjU5Ii8+PC9hOmFjY2VudDM+PGE6YWNjZW50ND48YTpzcmdiQ2xyIHZhbD0iODA2NEEyIi8+PC9hOmFjY2VudDQ+PGE6YWNjZW50NT48YTpzcmdiQ2xyIHZhbD0iNEJBQ0M2Ii8+PC9hOmFjY2VudDU+PGE6YWNjZW50Nj48YTpzcmdiQ2xyIHZhbD0iRjc5NjQ2Ii8+PC9hOmFjY2VudDY+PGE6aGxpbms+PGE6c3JnYkNsciB2YWw9IjAwMDBGRiIvPjwvYTpobGluaz48YTpmb2xIbGluaz48YTpzcmdiQ2xyIHZhbD0iODAwMDgwIi8+PC9hOmZvbEhsaW5rPjwvYTpjbHJTY2hlbWU+PGE6Zm9udFNjaGVtZSBuYW1lPSJPZmZpY2UiPjxhOm1ham9yRm9udD48YTpsYXRpbiB0eXBlZmFjZT0iQ2FtYnJpYSIvPjxhOmVhIHR5cGVmYWNlPSIiLz48YTpjcyB0eXBlZmFjZT0iIi8+PGE6Zm9udCBzY3JpcHQ9IkpwYW4iIHR5cGVmYWNlPSLvvK3vvLMg77yw44K044K344OD44KvIi8+PGE6Zm9udCBzY3JpcHQ9IkhhbmciIHR5cGVmYWNlPSLrp5HsnYAg6rOg65SVIi8+PGE6Zm9udCBzY3JpcHQ9IkhhbnMiIHR5cGVmYWNlPSLlrovkvZMiLz48YTpmb250IHNjcmlwdD0iSGFudCIgdHlwZWZhY2U9IuaWsOe0sOaYjumrlCIvPjxhOmZvbnQgc2NyaXB0PSJBcmFiIiB0eXBlZmFjZT0iVGltZXMgTmV3IFJvbWFuIi8+PGE6Zm9udCBzY3JpcHQ9IkhlYnIiIHR5cGVmYWNlPSJUaW1lcyBOZXcgUm9tYW4iLz48YTpmb250IHNjcmlwdD0iVGhhaSIgdHlwZWZhY2U9IlRhaG9tYSIvPjxhOmZvbnQgc2NyaXB0PSJFdGhpIiB0eXBlZmFjZT0iTnlhbGEiLz48YTpmb250IHNjcmlwdD0iQmVuZyIgdHlwZWZhY2U9IlZyaW5kYSIvPjxhOmZvbnQgc2NyaXB0PSJHdWpyIiB0eXBlZmFjZT0iU2hydXRpIi8+PGE6Zm9udCBzY3JpcHQ9IktobXIiIHR5cGVmYWNlPSJNb29sQm9yYW4iLz48YTpmb250IHNjcmlwdD0iS25kYSIgdHlwZWZhY2U9IlR1bmdhIi8+PGE6Zm9udCBzY3JpcHQ9Ikd1cnUiIHR5cGVmYWNlPSJSYWF2aSIvPjxhOmZvbnQgc2NyaXB0PSJDYW5zIiB0eXBlZmFjZT0iRXVwaGVtaWEiLz48YTpmb250IHNjcmlwdD0iQ2hlciIgdHlwZWZhY2U9IlBsYW50YWdlbmV0IENoZXJva2VlIi8+PGE6Zm9udCBzY3JpcHQ9IllpaWkiIHR5cGVmYWNlPSJNaWNyb3NvZnQgWWkgQmFpdGkiLz48YTpmb250IHNjcmlwdD0iVGlidCIgdHlwZWZhY2U9Ik1pY3Jvc29mdCBIaW1hbGF5YSIvPjxhOmZvbnQgc2NyaXB0PSJUaGFhIiB0eXBlZmFjZT0iTVYgQm9saSIvPjxhOmZvbnQgc2NyaXB0PSJEZXZhIiB0eXBlZmFjZT0iTWFuZ2FsIi8+PGE6Zm9udCBzY3JpcHQ9IlRlbHUiIHR5cGVmYWNlPSJHYXV0YW1pIi8+PGE6Zm9udCBzY3JpcHQ9IlRhbWwiIHR5cGVmYWNlPSJMYXRoYSIvPjxhOmZvbnQgc2NyaXB0PSJTeXJjIiB0eXBlZmFjZT0iRXN0cmFuZ2VsbyBFZGVzc2EiLz48YTpmb250IHNjcmlwdD0iT3J5YSIgdHlwZWZhY2U9IkthbGluZ2EiLz48YTpmb250IHNjcmlwdD0iTWx5bSIgdHlwZWZhY2U9IkthcnRpa2EiLz48YTpmb250IHNjcmlwdD0iTGFvbyIgdHlwZWZhY2U9IkRva0NoYW1wYSIvPjxhOmZvbnQgc2NyaXB0PSJTaW5oIiB0eXBlZmFjZT0iSXNrb29sYSBQb3RhIi8+PGE6Zm9udCBzY3JpcHQ9Ik1vbmciIHR5cGVmYWNlPSJNb25nb2xpYW4gQmFpdGkiLz48YTpmb250IHNjcmlwdD0iVmlldCIgdHlwZWZhY2U9IlRpbWVzIE5ldyBSb21hbiIvPjxhOmZvbnQgc2NyaXB0PSJVaWdoIiB0eXBlZmFjZT0iTWljcm9zb2Z0IFVpZ2h1ciIvPjxhOmZvbnQgc2NyaXB0PSJHZW9yIiB0eXBlZmFjZT0iU3lsZmFlbiIvPjwvYTptYWpvckZvbnQ+PGE6bWlub3JGb250PjxhOmxhdGluIHR5cGVmYWNlPSJDYWxpYnJpIi8+PGE6ZWEgdHlwZWZhY2U9IiIvPjxhOmNzIHR5cGVmYWNlPSIiLz48YTpmb250IHNjcmlwdD0iSnBhbiIgdHlwZWZhY2U9Iu+8re+8syDvvLDjgrTjgrfjg4Pjgq8iLz48YTpmb250IHNjcmlwdD0iSGFuZyIgdHlwZWZhY2U9IuunkeydgCDqs6DrlJUiLz48YTpmb250IHNjcmlwdD0iSGFucyIgdHlwZWZhY2U9IuWui+S9kyIvPjxhOmZvbnQgc2NyaXB0PSJIYW50IiB0eXBlZmFjZT0i5paw57Sw5piO6auUIi8+PGE6Zm9udCBzY3JpcHQ9IkFyYWIiIHR5cGVmYWNlPSJBcmlhbCIvPjxhOmZvbnQgc2NyaXB0PSJIZWJyIiB0eXBlZmFjZT0iQXJpYWwiLz48YTpmb250IHNjcmlwdD0iVGhhaSIgdHlwZWZhY2U9IlRhaG9tYSIvPjxhOmZvbnQgc2NyaXB0PSJFdGhpIiB0eXBlZmFjZT0iTnlhbGEiLz48YTpmb250IHNjcmlwdD0iQmVuZyIgdHlwZWZhY2U9IlZyaW5kYSIvPjxhOmZvbnQgc2NyaXB0PSJHdWpyIiB0eXBlZmFjZT0iU2hydXRpIi8+PGE6Zm9udCBzY3JpcHQ9IktobXIiIHR5cGVmYWNlPSJEYXVuUGVuaCIvPjxhOmZvbnQgc2NyaXB0PSJLbmRhIiB0eXBlZmFjZT0iVHVuZ2EiLz48YTpmb250IHNjcmlwdD0iR3VydSIgdHlwZWZhY2U9IlJhYXZpIi8+PGE6Zm9udCBzY3JpcHQ9IkNhbnMiIHR5cGVmYWNlPSJFdXBoZW1pYSIvPjxhOmZvbnQgc2NyaXB0PSJDaGVyIiB0eXBlZmFjZT0iUGxhbnRhZ2VuZXQgQ2hlcm9rZWUiLz48YTpmb250IHNjcmlwdD0iWWlpaSIgdHlwZWZhY2U9Ik1pY3Jvc29mdCBZaSBCYWl0aSIvPjxhOmZvbnQgc2NyaXB0PSJUaWJ0IiB0eXBlZmFjZT0iTWljcm9zb2Z0IEhpbWFsYXlhIi8+PGE6Zm9udCBzY3JpcHQ9IlRoYWEiIHR5cGVmYWNlPSJNViBCb2xpIi8+PGE6Zm9udCBzY3JpcHQ9IkRldmEiIHR5cGVmYWNlPSJNYW5nYWwiLz48YTpmb250IHNjcmlwdD0iVGVsdSIgdHlwZWZhY2U9IkdhdXRhbWkiLz48YTpmb250IHNjcmlwdD0iVGFtbCIgdHlwZWZhY2U9IkxhdGhhIi8+PGE6Zm9udCBzY3JpcHQ9IlN5cmMiIHR5cGVmYWNlPSJFc3RyYW5nZWxvIEVkZXNzYSIvPjxhOmZvbnQgc2NyaXB0PSJPcnlhIiB0eXBlZmFjZT0iS2FsaW5nYSIvPjxhOmZvbnQgc2NyaXB0PSJNbHltIiB0eXBlZmFjZT0iS2FydGlrYSIvPjxhOmZvbnQgc2NyaXB0PSJMYW9vIiB0eXBlZmFjZT0iRG9rQ2hhbXBhIi8+PGE6Zm9udCBzY3JpcHQ9IlNpbmgiIHR5cGVmYWNlPSJJc2tvb2xhIFBvdGEiLz48YTpmb250IHNjcmlwdD0iTW9uZyIgdHlwZWZhY2U9Ik1vbmdvbGlhbiBCYWl0aSIvPjxhOmZvbnQgc2NyaXB0PSJWaWV0IiB0eXBlZmFjZT0iQXJpYWwiLz48YTpmb250IHNjcmlwdD0iVWlnaCIgdHlwZWZhY2U9Ik1pY3Jvc29mdCBVaWdodXIiLz48YTpmb250IHNjcmlwdD0iR2VvciIgdHlwZWZhY2U9IlN5bGZhZW4iLz48L2E6bWlub3JGb250PjwvYTpmb250U2NoZW1lPjxhOmZtdFNjaGVtZSBuYW1lPSJPZmZpY2UiPjxhOmZpbGxTdHlsZUxzdD48YTpzb2xpZEZpbGw+PGE6c2NoZW1lQ2xyIHZhbD0icGhDbHIiLz48L2E6c29saWRGaWxsPjxhOmdyYWRGaWxsIHJvdFdpdGhTaGFwZT0iMSI+PGE6Z3NMc3Q+PGE6Z3MgcG9zPSIwIj48YTpzY2hlbWVDbHIgdmFsPSJwaENsciI+PGE6dGludCB2YWw9IjUwMDAwIi8+PGE6c2F0TW9kIHZhbD0iMzAwMDAwIi8+PC9hOnNjaGVtZUNscj48L2E6Z3M+PGE6Z3MgcG9zPSIzNTAwMCI+PGE6c2NoZW1lQ2xyIHZhbD0icGhDbHIiPjxhOnRpbnQgdmFsPSIzNzAwMCIvPjxhOnNhdE1vZCB2YWw9IjMwMDAwMCIvPjwvYTpzY2hlbWVDbHI+PC9hOmdzPjxhOmdzIHBvcz0iMTAwMDAwIj48YTpzY2hlbWVDbHIgdmFsPSJwaENsciI+PGE6dGludCB2YWw9IjE1MDAwIi8+PGE6c2F0TW9kIHZhbD0iMzUwMDAwIi8+PC9hOnNjaGVtZUNscj48L2E6Z3M+PC9hOmdzTHN0PjxhOmxpbiBhbmc9IjE2MjAwMDAwIiBzY2FsZWQ9IjEiLz48L2E6Z3JhZEZpbGw+PGE6Z3JhZEZpbGwgcm90V2l0aFNoYXBlPSIxIj48YTpnc0xzdD48YTpncyBwb3M9IjAiPjxhOnNjaGVtZUNsciB2YWw9InBoQ2xyIj48YTpzaGFkZSB2YWw9IjUxMDAwIi8+PGE6c2F0TW9kIHZhbD0iMTMwMDAwIi8+PC9hOnNjaGVtZUNscj48L2E6Z3M+PGE6Z3MgcG9zPSI4MDAwMCI+PGE6c2NoZW1lQ2xyIHZhbD0icGhDbHIiPjxhOnNoYWRlIHZhbD0iOTMwMDAiLz48YTpzYXRNb2QgdmFsPSIxMzAwMDAiLz48L2E6c2NoZW1lQ2xyPjwvYTpncz48YTpncyBwb3M9IjEwMDAwMCI+PGE6c2NoZW1lQ2xyIHZhbD0icGhDbHIiPjxhOnNoYWRlIHZhbD0iOTQwMDAiLz48YTpzYXRNb2QgdmFsPSIxMzUwMDAiLz48L2E6c2NoZW1lQ2xyPjwvYTpncz48L2E6Z3NMc3Q+PGE6bGluIGFuZz0iMTYyMDAwMDAiIHNjYWxlZD0iMCIvPjwvYTpncmFkRmlsbD48L2E6ZmlsbFN0eWxlTHN0PjxhOmxuU3R5bGVMc3Q+PGE6bG4gdz0iOTUyNSIgY2FwPSJmbGF0IiBjbXBkPSJzbmciIGFsZ249ImN0ciI+PGE6c29saWRGaWxsPjxhOnNjaGVtZUNsciB2YWw9InBoQ2xyIj48YTpzaGFkZSB2YWw9Ijk1MDAwIi8+PGE6c2F0TW9kIHZhbD0iMTA1MDAwIi8+PC9hOnNjaGVtZUNscj48L2E6c29saWRGaWxsPjxhOnByc3REYXNoIHZhbD0ic29saWQiLz48L2E6bG4+PGE6bG4gdz0iMjU0MDAiIGNhcD0iZmxhdCIgY21wZD0ic25nIiBhbGduPSJjdHIiPjxhOnNvbGlkRmlsbD48YTpzY2hlbWVDbHIgdmFsPSJwaENsciIvPjwvYTpzb2xpZEZpbGw+PGE6cHJzdERhc2ggdmFsPSJzb2xpZCIvPjwvYTpsbj48YTpsbiB3PSIzODEwMCIgY2FwPSJmbGF0IiBjbXBkPSJzbmciIGFsZ249ImN0ciI+PGE6c29saWRGaWxsPjxhOnNjaGVtZUNsciB2YWw9InBoQ2xyIi8+PC9hOnNvbGlkRmlsbD48YTpwcnN0RGFzaCB2YWw9InNvbGlkIi8+PC9hOmxuPjwvYTpsblN0eWxlTHN0PjxhOmVmZmVjdFN0eWxlTHN0PjxhOmVmZmVjdFN0eWxlPjxhOmVmZmVjdExzdD48YTpvdXRlclNoZHcgYmx1clJhZD0iNDAwMDAiIGRpc3Q9IjIwMDAwIiBkaXI9IjU0MDAwMDAiIHJvdFdpdGhTaGFwZT0iMCI+PGE6c3JnYkNsciB2YWw9IjAwMDAwMCI+PGE6YWxwaGEgdmFsPSIzODAwMCIvPjwvYTpzcmdiQ2xyPjwvYTpvdXRlclNoZHc+PC9hOmVmZmVjdExzdD48L2E6ZWZmZWN0U3R5bGU+PGE6ZWZmZWN0U3R5bGU+PGE6ZWZmZWN0THN0PjxhOm91dGVyU2hkdyBibHVyUmFkPSI0MDAwMCIgZGlzdD0iMjMwMDAiIGRpcj0iNTQwMDAwMCIgcm90V2l0aFNoYXBlPSIwIj48YTpzcmdiQ2xyIHZhbD0iMDAwMDAwIj48YTphbHBoYSB2YWw9IjM1MDAwIi8+PC9hOnNyZ2JDbHI+PC9hOm91dGVyU2hkdz48L2E6ZWZmZWN0THN0PjwvYTplZmZlY3RTdHlsZT48YTplZmZlY3RTdHlsZT48YTplZmZlY3RMc3Q+PGE6b3V0ZXJTaGR3IGJsdXJSYWQ9IjQwMDAwIiBkaXN0PSIyMzAwMCIgZGlyPSI1NDAwMDAwIiByb3RXaXRoU2hhcGU9IjAiPjxhOnNyZ2JDbHIgdmFsPSIwMDAwMDAiPjxhOmFscGhhIHZhbD0iMzUwMDAiLz48L2E6c3JnYkNscj48L2E6b3V0ZXJTaGR3PjwvYTplZmZlY3RMc3Q+PGE6c2NlbmUzZD48YTpjYW1lcmEgcHJzdD0ib3J0aG9ncmFwaGljRnJvbnQiPjxhOnJvdCBsYXQ9IjAiIGxvbj0iMCIgcmV2PSIwIi8+PC9hOmNhbWVyYT48YTpsaWdodFJpZyByaWc9InRocmVlUHQiIGRpcj0idCI+PGE6cm90IGxhdD0iMCIgbG9uPSIwIiByZXY9IjEyMDAwMDAiLz48L2E6bGlnaHRSaWc+PC9hOnNjZW5lM2Q+PGE6c3AzZD48YTpiZXZlbFQgdz0iNjM1MDAiIGg9IjI1NDAwIi8+PC9hOnNwM2Q+PC9hOmVmZmVjdFN0eWxlPjwvYTplZmZlY3RTdHlsZUxzdD48YTpiZ0ZpbGxTdHlsZUxzdD48YTpzb2xpZEZpbGw+PGE6c2NoZW1lQ2xyIHZhbD0icGhDbHIiLz48L2E6c29saWRGaWxsPjxhOmdyYWRGaWxsIHJvdFdpdGhTaGFwZT0iMSI+PGE6Z3NMc3Q+PGE6Z3MgcG9zPSIwIj48YTpzY2hlbWVDbHIgdmFsPSJwaENsciI+PGE6dGludCB2YWw9IjQwMDAwIi8+PGE6c2F0TW9kIHZhbD0iMzUwMDAwIi8+PC9hOnNjaGVtZUNscj48L2E6Z3M+PGE6Z3MgcG9zPSI0MDAwMCI+PGE6c2NoZW1lQ2xyIHZhbD0icGhDbHIiPjxhOnRpbnQgdmFsPSI0NTAwMCIvPjxhOnNoYWRlIHZhbD0iOTkwMDAiLz48YTpzYXRNb2QgdmFsPSIzNTAwMDAiLz48L2E6c2NoZW1lQ2xyPjwvYTpncz48YTpncyBwb3M9IjEwMDAwMCI+PGE6c2NoZW1lQ2xyIHZhbD0icGhDbHIiPjxhOnNoYWRlIHZhbD0iMjAwMDAiLz48YTpzYXRNb2QgdmFsPSIyNTUwMDAiLz48L2E6c2NoZW1lQ2xyPjwvYTpncz48L2E6Z3NMc3Q+PGE6cGF0aCBwYXRoPSJjaXJjbGUiPjxhOmZpbGxUb1JlY3QgbD0iNTAwMDAiIHQ9Ii04MDAwMCIgcj0iNTAwMDAiIGI9IjE4MDAwMCIvPjwvYTpwYXRoPjwvYTpncmFkRmlsbD48YTpncmFkRmlsbCByb3RXaXRoU2hhcGU9IjEiPjxhOmdzTHN0PjxhOmdzIHBvcz0iMCI+PGE6c2NoZW1lQ2xyIHZhbD0icGhDbHIiPjxhOnRpbnQgdmFsPSI4MDAwMCIvPjxhOnNhdE1vZCB2YWw9IjMwMDAwMCIvPjwvYTpzY2hlbWVDbHI+PC9hOmdzPjxhOmdzIHBvcz0iMTAwMDAwIj48YTpzY2hlbWVDbHIgdmFsPSJwaENsciI+PGE6c2hhZGUgdmFsPSIzMDAwMCIvPjxhOnNhdE1vZCB2YWw9IjIwMDAwMCIvPjwvYTpzY2hlbWVDbHI+PC9hOmdzPjwvYTpnc0xzdD48YTpwYXRoIHBhdGg9ImNpcmNsZSI+PGE6ZmlsbFRvUmVjdCBsPSI1MDAwMCIgdD0iNTAwMDAiIHI9IjUwMDAwIiBiPSI1MDAwMCIvPjwvYTpwYXRoPjwvYTpncmFkRmlsbD48L2E6YmdGaWxsU3R5bGVMc3Q+PC9hOmZtdFNjaGVtZT48L2E6dGhlbWVFbGVtZW50cz48YTpvYmplY3REZWZhdWx0cy8+PGE6ZXh0cmFDbHJTY2hlbWVMc3QvPjwvYTp0aGVtZT4="
            },
            "worksheets": {
                "_rels": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg0KPFJlbGF0aW9uc2hpcHMgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9wYWNrYWdlLzIwMDYvcmVsYXRpb25zaGlwcyI+PFJlbGF0aW9uc2hpcCBJZD0icklkMSIgVHlwZT0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy90YWJsZSIgVGFyZ2V0PSIuLi90YWJsZXMvdGFibGUxLnhtbCIvPjwvUmVsYXRpb25zaGlwcz4=",
                "blank_sheet": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg0KPHdvcmtzaGVldCB4bWxucz0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL3NwcmVhZHNoZWV0bWwvMjAwNi9tYWluIiB4bWxuczpyPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzIiB4bWxuczptYz0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL21hcmt1cC1jb21wYXRpYmlsaXR5LzIwMDYiIG1jOklnbm9yYWJsZT0ieDE0YWMiIHhtbG5zOngxNGFjPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL29mZmljZS9zcHJlYWRzaGVldG1sLzIwMDkvOS9hYyI+PGRpbWVuc2lvbiByZWY9IkExIi8+PHNoZWV0Vmlld3M+PHNoZWV0VmlldyB3b3JrYm9va1ZpZXdJZD0iMCIvPjwvc2hlZXRWaWV3cz48c2hlZXRGb3JtYXRQciBkZWZhdWx0Um93SGVpZ2h0PSIxNSIgeDE0YWM6ZHlEZXNjZW50PSIwLjI1Ii8+PHNoZWV0RGF0YS8+PHBhZ2VNYXJnaW5zIGxlZnQ9IjAuNyIgcmlnaHQ9IjAuNyIgdG9wPSIwLjc1IiBib3R0b209IjAuNzUiIGhlYWRlcj0iMC4zIiBmb290ZXI9IjAuMyIvPjwvd29ya3NoZWV0Pg=="
            },
            "styles.xml": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg0KPHN0eWxlU2hlZXQgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9zcHJlYWRzaGVldG1sLzIwMDYvbWFpbiIgeG1sbnM6bWM9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9tYXJrdXAtY29tcGF0aWJpbGl0eS8yMDA2IiBtYzpJZ25vcmFibGU9IngxNGFjIiB4bWxuczp4MTRhYz0iaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9vZmZpY2Uvc3ByZWFkc2hlZXRtbC8yMDA5LzkvYWMiPjxmb250cyBjb3VudD0iMSIgeDE0YWM6a25vd25Gb250cz0iMSI+PGZvbnQ+PHN6IHZhbD0iMTEiLz48Y29sb3IgdGhlbWU9IjEiLz48bmFtZSB2YWw9IkNhbGlicmkiLz48ZmFtaWx5IHZhbD0iMiIvPjxzY2hlbWUgdmFsPSJtaW5vciIvPjwvZm9udD48L2ZvbnRzPjxmaWxscyBjb3VudD0iMiI+PGZpbGw+PHBhdHRlcm5GaWxsIHBhdHRlcm5UeXBlPSJub25lIi8+PC9maWxsPjxmaWxsPjxwYXR0ZXJuRmlsbCBwYXR0ZXJuVHlwZT0iZ3JheTEyNSIvPjwvZmlsbD48L2ZpbGxzPjxib3JkZXJzIGNvdW50PSIxIj48Ym9yZGVyPjxsZWZ0Lz48cmlnaHQvPjx0b3AvPjxib3R0b20vPjxkaWFnb25hbC8+PC9ib3JkZXI+PC9ib3JkZXJzPjxjZWxsU3R5bGVYZnMgY291bnQ9IjEiPjx4ZiBudW1GbXRJZD0iMCIgZm9udElkPSIwIiBmaWxsSWQ9IjAiIGJvcmRlcklkPSIwIi8+PC9jZWxsU3R5bGVYZnM+PGNlbGxYZnMgY291bnQ9IjIiPjx4ZiBudW1GbXRJZD0iMCIgZm9udElkPSIwIiBmaWxsSWQ9IjAiIGJvcmRlcklkPSIwIiB4ZklkPSIwIi8+PHhmIG51bUZtdElkPSIwIiBmb250SWQ9IjAiIGZpbGxJZD0iMCIgYm9yZGVySWQ9IjAiIHhmSWQ9IjAiIGFwcGx5QWxpZ25tZW50PSIxIj48YWxpZ25tZW50IGhvcml6b250YWw9ImxlZnQiLz48L3hmPjwvY2VsbFhmcz48Y2VsbFN0eWxlcyBjb3VudD0iMSI+PGNlbGxTdHlsZSBuYW1lPSJOb3JtYWwiIHhmSWQ9IjAiIGJ1aWx0aW5JZD0iMCIvPjwvY2VsbFN0eWxlcz48ZHhmcyBjb3VudD0iMSI+PGR4Zj48YWxpZ25tZW50IGhvcml6b250YWw9ImxlZnQiIHZlcnRpY2FsPSJib3R0b20iIHRleHRSb3RhdGlvbj0iMCIgd3JhcFRleHQ9IjAiIGluZGVudD0iMCIganVzdGlmeUxhc3RMaW5lPSIwIiBzaHJpbmtUb0ZpdD0iMCIgcmVhZGluZ09yZGVyPSIwIi8+PC9keGY+PC9keGZzPjx0YWJsZVN0eWxlcyBjb3VudD0iMCIgZGVmYXVsdFRhYmxlU3R5bGU9IlRhYmxlU3R5bGVNZWRpdW0yIiBkZWZhdWx0UGl2b3RTdHlsZT0iUGl2b3RTdHlsZUxpZ2h0MTYiLz48ZXh0THN0PjxleHQgdXJpPSJ7RUI3OURFRjItODBCOC00M2U1LTk1QkQtNTRDQkRERjkwMjBDfSIgeG1sbnM6eDE0PSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL29mZmljZS9zcHJlYWRzaGVldG1sLzIwMDkvOS9tYWluIj48eDE0OnNsaWNlclN0eWxlcyBkZWZhdWx0U2xpY2VyU3R5bGU9IlNsaWNlclN0eWxlTGlnaHQxIi8+PC9leHQ+PC9leHRMc3Q+PC9zdHlsZVNoZWV0Pg==",
            "workbook.xml": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg0KPHdvcmtib29rIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvc3ByZWFkc2hlZXRtbC8yMDA2L21haW4iIHhtbG5zOnI9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMiPjxmaWxlVmVyc2lvbiBhcHBOYW1lPSJ4bCIgbGFzdEVkaXRlZD0iNSIgbG93ZXN0RWRpdGVkPSI1IiBydXBCdWlsZD0iOTMwMyIvPjx3b3JrYm9va1ByIGRlZmF1bHRUaGVtZVZlcnNpb249IjEyNDIyNiIvPjxib29rVmlld3M+PHdvcmtib29rVmlldyB4V2luZG93PSIxMjAiIHlXaW5kb3c9IjEwNSIgd2luZG93V2lkdGg9IjEyNDM1IiB3aW5kb3dIZWlnaHQ9IjY5OTAiLz48L2Jvb2tWaWV3cz48c2hlZXRzPjxzaGVldCBuYW1lPSJTaGVldDEiIHNoZWV0SWQ9IjEiIHI6aWQ9InJJZDEiLz48c2hlZXQgbmFtZT0iU2hlZXQyIiBzaGVldElkPSIyIiByOmlkPSJySWQyIi8+PHNoZWV0IG5hbWU9IlNoZWV0MyIgc2hlZXRJZD0iMyIgcjppZD0icklkMyIvPjwvc2hlZXRzPjxjYWxjUHIgY2FsY0lkPSIxNDU2MjEiLz48L3dvcmtib29rPg=="
        },
        "ContentTypes": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg0KPFR5cGVzIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvcGFja2FnZS8yMDA2L2NvbnRlbnQtdHlwZXMiPjxEZWZhdWx0IEV4dGVuc2lvbj0icmVscyIgQ29udGVudFR5cGU9ImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1wYWNrYWdlLnJlbGF0aW9uc2hpcHMreG1sIi8+PERlZmF1bHQgRXh0ZW5zaW9uPSJ4bWwiIENvbnRlbnRUeXBlPSJhcHBsaWNhdGlvbi94bWwiLz48T3ZlcnJpZGUgUGFydE5hbWU9Ii94bC93b3JrYm9vay54bWwiIENvbnRlbnRUeXBlPSJhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldC5tYWluK3htbCIvPjxPdmVycmlkZSBQYXJ0TmFtZT0iL3hsL3dvcmtzaGVldHMvc2hlZXQxLnhtbCIgQ29udGVudFR5cGU9ImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLndvcmtzaGVldCt4bWwiLz48T3ZlcnJpZGUgUGFydE5hbWU9Ii94bC93b3Jrc2hlZXRzL3NoZWV0Mi54bWwiIENvbnRlbnRUeXBlPSJhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC53b3Jrc2hlZXQreG1sIi8+PE92ZXJyaWRlIFBhcnROYW1lPSIveGwvd29ya3NoZWV0cy9zaGVldDMueG1sIiBDb250ZW50VHlwZT0iYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwud29ya3NoZWV0K3htbCIvPjxPdmVycmlkZSBQYXJ0TmFtZT0iL3hsL3RoZW1lL3RoZW1lMS54bWwiIENvbnRlbnRUeXBlPSJhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQudGhlbWUreG1sIi8+PE92ZXJyaWRlIFBhcnROYW1lPSIveGwvc3R5bGVzLnhtbCIgQ29udGVudFR5cGU9ImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnN0eWxlcyt4bWwiLz48T3ZlcnJpZGUgUGFydE5hbWU9Ii94bC9zaGFyZWRTdHJpbmdzLnhtbCIgQ29udGVudFR5cGU9ImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoYXJlZFN0cmluZ3MreG1sIi8+PE92ZXJyaWRlIFBhcnROYW1lPSIveGwvdGFibGVzL3RhYmxlMS54bWwiIENvbnRlbnRUeXBlPSJhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC50YWJsZSt4bWwiLz48T3ZlcnJpZGUgUGFydE5hbWU9Ii9kb2NQcm9wcy9jb3JlLnhtbCIgQ29udGVudFR5cGU9ImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1wYWNrYWdlLmNvcmUtcHJvcGVydGllcyt4bWwiLz48T3ZlcnJpZGUgUGFydE5hbWU9Ii9kb2NQcm9wcy9hcHAueG1sIiBDb250ZW50VHlwZT0iYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LmV4dGVuZGVkLXByb3BlcnRpZXMreG1sIi8+PC9UeXBlcz4="
    };

    this.static_pieces = {
        "xml_header": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pg=="
    };

    this.range = "";

    /**** XML GENERATORS ****/

    /**
     * Creates sharedStrings.xml file.
     * 
     * Excel files have a sharedStrings.xml, this file holds all of the strings
     * used in the Excel spreadsheet to reduce repeating data.
     */
    this.sharedStrings = {
        "xml": {
            //sst: {0} = count
            //sst: {1} = uniqueCount
            "open_sst": "PHNzdCB4bWxucz0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL3NwcmVhZHNoZWV0bWwvMjAwNi9tYWluIiBjb3VudD0iezB9IiB1bmlxdWVDb3VudD0iezF9Ij4=",
            "close_sst": "</sst>",
            //si: {0} = value
            "si": "<si><t>{0}</t></si>"
        },
        "count": 0,
        "vals": [],
        /**
         * Adds value to Cache if it is a string and isn't already included.
         *
         * @returns {sharedString Value Object}
         */
        "add": function (value) {
            if (isNaN(value)) {
                this.count++;
                if (this.vals.indexOf(value) === -1) {
                    this.vals.push(value);
                }
                return { "type": "shared", "value": this.vals.indexOf(value), "text": value };
            } else {
                return { "type": "literal", "value": value, "text": value };
            }
        },
        /**
         * Creates sharedString.xml.
         */
        "to_xml": function () {
            out = [];
            out.push(atob(me.static_pieces.xml_header));
            out.push("\n");
            out.push(atob(this.xml.open_sst).format(this.count, this.vals.length));
            var si = this.xml.si;
            this.vals.forEach(function (v) {
                out.push(si.format(v));
            });
            out.push(this.xml.close_sst);
            return out.join("");
        }
    };

    this.table = {
        "xml": {
            // table: {0} = ref
            "open_table": "PHRhYmxlIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvc3ByZWFkc2hlZXRtbC8yMDA2L21haW4iIGlkPSIxIiBuYW1lPSJUYWJsZTEiIGRpc3BsYXlOYW1lPSJUYWJsZTEiIHJlZj0iezB9IiB0b3RhbHNSb3dTaG93bj0iMCI+",
            "close_table": "</table>",
            //autoFilter: {0} = ref
            "autoFilter": "PGF1dG9GaWx0ZXIgcmVmPSJ7MH0iLz4=",
            //tableColumns: {0} = count
            "tableColumns": "PHRhYmxlQ29sdW1ucyBjb3VudD0iezB9Ij4=",
            //tableColumn: {0} = id
            //tableColumn: {1} = name
            "tableColumn": "PHRhYmxlQ29sdW1uIGlkPSJ7MH0iIG5hbWU9InsxfSIvPg==",
            "close_tableColumns": "</tableColumns>",
            "tableStyleInfo": "PHRhYmxlU3R5bGVJbmZvIG5hbWU9IlRhYmxlU3R5bGVNZWRpdW0yIiBzaG93Rmlyc3RDb2x1bW49IjAiIHNob3dMYXN0Q29sdW1uPSIwIiBzaG93Um93U3RyaXBlcz0iMSIgc2hvd0NvbHVtblN0cmlwZXM9IjAiLz4="
        },
        "to_xml": function () {
            var out = [];
            out.push(atob(me.static_pieces.xml_header));
            out.push("\n");
            out.push(atob(this.xml.open_table).format(me.range));
            out.push(atob(this.xml.autoFilter).format(me.range));
            out.push(atob(this.xml.tableColumns).format(me.headers.length));
            var tableColumn = atob(this.xml.tableColumn);
            me.headers.forEach(function (v, i) {
                //First row has dataDxfId="0" in the sample leaving out incase
                out.push(tableColumn.format((i + 1), v));
            });
            out.push(this.xml.close_tableColumns);
            out.push(atob(this.xml.tableStyleInfo));
            out.push(this.xml.close_table);
            return out.join("");
        }
    }

    this.sheet = {
        "xml": {
            //dimension: {0} = ref
            //selection: {1} = sqref
            "start": "PHdvcmtzaGVldCB4bWxucz0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL3NwcmVhZHNoZWV0bWwvMjAwNi9tYWluIiB4bWxuczpyPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzIiB4bWxuczptYz0iaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL21hcmt1cC1jb21wYXRpYmlsaXR5LzIwMDYiIG1jOklnbm9yYWJsZT0ieDE0YWMiIHhtbG5zOngxNGFjPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL29mZmljZS9zcHJlYWRzaGVldG1sLzIwMDkvOS9hYyI+PGRpbWVuc2lvbiByZWY9InswfSIvPjxzaGVldFZpZXdzPjxzaGVldFZpZXcgdGFiU2VsZWN0ZWQ9IjEiIHdvcmtib29rVmlld0lkPSIwIj48c2VsZWN0aW9uIHNxcmVmPSJ7MX0iLz48L3NoZWV0Vmlldz48L3NoZWV0Vmlld3M+PHNoZWV0Rm9ybWF0UHIgZGVmYXVsdFJvd0hlaWdodD0iMTUiIHgxNGFjOmR5RGVzY2VudD0iMC4yYiIvPg==",
            "margins": "PHBhZ2VNYXJnaW5zIGxlZnQ9IjAuNyIgcmlnaHQ9IjAuNyIgdG9wPSIwLjc1IiBib3R0b209IjAuNzUiIGhlYWRlcj0iMC4zIiBmb290ZXI9IjAuMyIvPg==",
            //row: {0} = r
            //row: {1} = spans
            "row": "PHJvdyByPSJ7MH0iIHNwYW5zPSJ7MX0iIHgxNGFjOmR5RGVzY2VudD0iMC4yNSI+",
            "close_row": "</row>",
            //cell: {0} = r
            //cell: {1} = cell value
            "cell": "PGMgcj0iezB9IiBzPSIxIj48dj57MX08L3Y+PC9jPg==",
            "shared_cell": "PGMgcj0iezB9IiBzPSIxIiB0PSJzIj48dj57MX08L3Y+PC9jPg==",
            "table": "PHRhYmxlUGFydHMgY291bnQ9IjEiPjx0YWJsZVBhcnQgcjppZD0icklkMSIvPjwvdGFibGVQYXJ0cz4=",
            //col: {0} = min
            //col: {1} = max
            //col: {2} = width
            "col": "PGNvbCBtaW49InswfSIgbWF4PSJ7MX0iIHdpZHRoPSJ7Mn0iIGN1c3RvbVdpZHRoPSIxIi8+",
            "open_cols": "<cols>",
            "close_cols": "</cols>",
            "open_sd": "<sheetData>",
            "close_sd": "</sheetData>",
            "end": "</worksheet>"
        },
        "rows": [],
        "is_table": true,
        "to_xml": function () {
            //generate the beginning xml of the sheet
            front = [];
            front.push(atob(me.static_pieces.xml_header));
            front.push("\n");
            console.log(this)
            me.range = me.__column_number__(1) + "1:" + me.__column_number__(this.rows[0].length) + this.rows.length;
            front.push(atob(this.xml.start).format(me.range, me.range));

            data = [];

            data.push(this.xml.open_sd);
            var spans = "1:" + this.rows[0].length;
            var colWidths = {};
            var row = atob(this.xml.row);
            var cell = atob(this.xml.cell);
            var shared_cell = atob(this.xml.shared_cell);

            ot = this;
            this.rows.forEach(function (v, i) {
                data.push(row.format((i + 1), spans));
                v.forEach(function (c, j) {
                    if (c.type === "shared") {
                        data.push(shared_cell.format((me.__column_number__(j + 1) + "" + (i + 1)), c.value));
                    } else {
                        data.push(cell.format((me.__column_number__(j + 1) + "" + (i + 1)), c.value));
                    }
                    colWidths[j] = (!colWidths[j] || (c.text.length + 5) > colWidths[j]) ? c.text.length + 5 : colWidths[j];
                });
                data.push(ot.xml.close_row);
            });

            data.push(this.xml.close_sd);
            data.push(atob(this.xml.margins));
            if (this.is_table) {
                data.push(atob(this.xml.table));
            }
            data.push(this.xml.end);

            cols = [];
            col = atob(this.xml.col);
            cols.push(this.xml.open_cols);
            for (var key in colWidths) {
                v = parseInt(key) + 1;
                //in my sample first column has style=1 didn't do it here.
                cols.push(col.format(v, v, colWidths[key]));
            }
            cols.push(this.xml.close_cols);

            return front.join("") + cols.join("") + data.join("");
        }
    };

    /*
    helpers
    */
    this.__column_number__ = function (val) {
        for (var out = '', a = 1, b = 26; (val -= a) >= 0; a = b, b *= 26) {
            out = String.fromCharCode(parseInt((val % b) / a) + 65) + out;
        }
        return out;
    };

	String.prototype.format = function () {
		return (function (a, t) { return t.replace(/\{(\d+)\}/g, function (_, i) { return a[~ ~i] }) })(arguments, this);
	};

	/**
	 *    Extension of JQuery Library for getting either the text or the value out of child elements.
	 *
	 *    Looks at the children elements, if it finds select or input tag, 
	 *    it returns the value, otherwise it returns the text of the element.
	 */
	jQuery.fn.extend({
	  "textOrValue": function () {
		var t = this.find("select, input");
		return (t.length) ? t.val():this.text();
	  }
	});

    /**
     * Basic internal initialization.
     */
    this.__initialize__ = function (options) {
        this.options = $.extend(this.defaultOptions, options);
        this.__readHTMLTable__();
    };

    this.__readHTMLTable__ = function () {
        //setup HTML input
        if (this.options.src_id) {
            var table = $("#" + this.options.src_id);
            if ((table.length) && (table.prop("tagName") == "TABLE")) {
                var skipFirst = false;
                if ((!this.options.header_row) && (this.options.show_header)) {
                    if (table.has("thead").length) {
                        this.options.header_row = table.find("thead tr:nth-child(1)")
                    } else {
                        this.options.header_row = table.find("tr:nth-child(1)")
                        skipFirst = true;
                    }
                    this.col_count = this.options.header_row.length;
                }
                if (!this.options.body_rows) {
                    if (table.has("tbody").length) {
                        this.options.body_rows = (skipFirst) ? table.find("tbody tr").not(":first") : table.find("tbody tr");
                    } else {
                        this.options.body_rows = (skipFirst) ? table.find("tr").not(":first") : table.find("tr");
                    }
                    this.col_count = (this.col_count === 0) ? this.options.body_rows[0].length : this.col_count;
                }
            }
        }
        //process header if it exists
        if (this.options.header_row) {
            var row = [];
            var outerThis = this;
            var headLength = this.options.header_row.children("th,td").length;
            this.options.header_row.children("th,td").each(function () {
                //header text gets stored for table
            	if($(this).context.cellIndex==0 || $(this).context.cellIndex==headLength-1) {
            		return true;
            	}
                var txt = $(this).textOrValue().trim().replace(/ +(?= )/g, '');
                outerThis.headers.push(txt);
                row.push(outerThis.sharedStrings.add(txt));
            });
            this.sheet.rows.push(row);
        }
        //process content
        if (this.options.body_rows) {
        	
            this.options.body_rows.each(function () {
                var row = [];
                var columnLength = $(this).children("td").length;
                $(this).children("td").each(function () {
                	if($(this).context.cellIndex==0 || $(this).context.cellIndex==columnLength-1) {
                		return true;
                	}
                    row.push(outerThis.sharedStrings.add($(this).textOrValue().trim().replace(/ +(?= )/g, '')));
                });
                outerThis.sheet.rows.push(row);
            });
        }
    };

    this.__blank__ = function () {

        var zip = new JSZip(), _rels = zip.folder("_rels"), doc = zip.folder("docProps"), xl = zip.folder("xl");
        _rels.file(".rels", atob(this.static_components._rels[".rels"]));
        doc.file("app.xml", atob(this.static_components.docProps["app.xml"]));
        doc.file("core.xml", atob(this.static_components.docProps["core.xml"]));
        zip.file("[Content_Types].xml", atob(this.static_components.ContentTypes));
        xl_rels = xl.folder("_rels");
        xl_theme = xl.folder("theme");
        xl_tables = xl.folder("tables");
        xl_worksheets = xl.folder("worksheets");
        if (this.options.type === "table") {
            var xl_ws_rels = xl_worksheets.folder("_rels");
            xl_ws_rels.file("sheet1.xml.rels", atob(this.static_components.xl.worksheets._rels));
        }
        //sheet2 and sheet3 shall be blank at this time
        xl_worksheets.file("sheet2.xml", atob(this.static_components.xl.worksheets.blank_sheet));
        xl_worksheets.file("sheet3.xml", atob(this.static_components.xl.worksheets.blank_sheet));
        xl_rels.file("workbook.xml.rels", atob(this.static_components.xl._rels["workbook.xml.rels"]));
        xl_theme.file("theme1.xml", atob(this.static_components.xl.theme["theme1.xml"]));
        xl.file("styles.xml", atob(this.static_components.xl["styles.xml"]));
        xl.file("workbook.xml", atob(this.static_components.xl["workbook.xml"]));
        return {
            "base": zip,
            "xl": xl,
            "tables": xl_tables,
            "worksheets": xl_worksheets
        };

    }

    this.generate = function () {
        var workbook = this.__blank__();
        workbook.worksheets.file("sheet1.xml", this.sheet.to_xml());
        workbook.xl.file("sharedStrings.xml", this.sharedStrings.to_xml());
        workbook.tables.file("table1.xml", this.table.to_xml());
        workbook.base.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, "example.xlsx");
            });
    };


    //initialize the object
    this.__initialize__(options);

};
