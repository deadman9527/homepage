/****************************************************************************
 Copyright (c) 2014 Louis W M WU.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * Created by Louis W M Wu on 2014/12/24.
 */
cobra.add({
    goods_config_list: '{{?it.data.list.length>0}}\
        {{~it.data.list:value:inx}}<tr>\
        <td>{{=value.sort}}</td>\
        <td>{{=value.goods_id}}</td>\
        <td>{{=value.name}}</td>\
        <td>{{?value.is_pc_dis == "0"}}否{{??}}是{{?}}</td>\
        <td>{{?value.is_app_dis == "0"}}否 {{??}}是{{?}}</td>\
        <td>{{?value.is_effect == "0"}}无效 {{??}}有效{{?}}</td>\
        <td style="padding-left: 0px;">\
        <div class="tooltip-demo">\
            <a href="javascript:;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="编辑" cb-event="click~goToEdit:{{=inx}}" data-original-title="Edit"><i class="fa fa-edit"></i></a>\
        </div></td>\
        </tr>{{~}}\
        {{?}}\
        ',
    pagination:'{{? it.data.page-1>0}}<li class="paginate_button previous" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_previous"><a href="javascript:;" cb-event="click~goPage:{{= it.data.page-1}}">上一页</a></li>{{?}}\
         {{? it.data.page-2>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:{{= it.data.page-2}}">{{= it.data.page-2}}</a></li>{{?}}\
         {{? it.data.page-1>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:{{= it.data.page-1}}">{{= it.data.page-1}}</a></li>{{?}}\
         {{? it.data.page && it.data.page>0}}<li class="paginate_button active" aria-controls="DataTables_Table_0" tabindex="0"><span class="current" cb-node="page_current">{{= it.data.page}}</span></li>{{?}}\
         {{? it.data.page+1<=it.data.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:{{= it.data.page+1}}">{{= it.data.page+1}}</a></li>{{?}}\
         {{? it.data.page+2<=it.data.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:{{= it.data.page+2}}">{{= it.data.page+2}}</a></li>{{?}}\
         {{? it.data.page+1<=it.data.total_pages}}<li class="paginate_button next" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_next"><a href="javascript:;" cb-event="click~goPage:{{= it.data.page+1}}">下一页</a></li>{{?}}\
         &nbsp;&nbsp;<span class="help-block m-b-none linedisplay">{{?it.data.total}}{{? parseInt(it.data.total) > it.data.pagesize}}当前{{=it.data.pagesize}}项{{??}}当前{{=it.data.total}}项{{?}} - {{? it.data.total}}共{{=it.data.total}}项{{?}}{{??}}未找到任何记录{{?}}</span>\
         '
});