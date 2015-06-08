/****************************************************************************
 Copyright (c) 2014 Louis W M Wu

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
    /* 用户类型配置 */
    "getGoodsConfigList" : {
        url : "/m.php?m=NavGoods&a=index",
        dev_url : "../../../stub/goods_config_list.json"
    },
/*    *//* 删除用户类型 *//*
    "getDelGoodsConfigList" : {
        url : "/m.php?m=PmsAdv&a=delAdv",
        dev_url : "../../../stub/del_goods_config_list.json"
    },*/
    "getGoodsConfigSubmit" : {
        url : "/m.php?m=NavGoods&a=edit",
        dev_url : "../../../stub/goods_config_submit.json"
    },
    "getEditOrderId" : {
        url : "/m.php?m=PmsAdv&a=addEditAdv",
        dev_url : "../../../stub/config_edit_orderid.json"
    }
});