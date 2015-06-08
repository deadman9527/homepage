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
    homepage_config_list: '{{?it.data.list.length>0}}\
        {{~it.data.list:value:inx}}<tr>\
        <td><input type="text" value="{{=value.sort}}" style="width:30px;text-align: center" cb-node = "sort_{{=inx}}" cb-event="click~goToEditOrderId:1;blur~editOrderId:{{=value.id}},sort_{{=inx}}" /></td>\
        <td>{{=value.name}}</td>\
        <td>{{=value.type}}</td>\
        <td>{{=value.goods_count}}</td>\
        <td>{{?value.is_pc_dis == "0"}}PC首页展示<br/>{{?}}{{?value.is_app_dis}}移动首页展示{{?}}</td>\
        <td>{{?value.is_banner_dis == "0"}}否 {{??}}是{{?}}</td>\
        <td>{{?value.is_effect == "0"}}否 {{??}}是{{?}}</td>\
        <td style="padding-left: 0px;">\
        <div class="tooltip-demo">\
            <a href="goods_config.html?key={{=value.id}}&name={{=value.name}}&type={{=value.type_id}}&tpl={{=value.tpl_type}}" class="" data-toggle="tooltip" data-placement="top" title="管理商品" cb-event="click~goToEdit:{{=inx}}">管理商品</a>\
            <a href="javascript:;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="编辑" cb-event="click~goToEdit:{{=inx}}" data-original-title="Edit"><i class="fa fa-edit"></i></a>\
            <a href="javascript:;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="删除" data-original-title="Print email" cb-event="click~goToDelete:{{=value.id}}"><i class="fa fa-trash-o"></i> </a>\
        </div></td>\
        </tr>{{~}}\
        {{?}}\
        ',
    typeList:'<option value="">请选择</option>{{~it.data.types:val:inx}}<option value="{{=val.id}}">{{=val.value}}</option>{{~}}'
});