cobra.add({
        "type": "object",
        "properties": {
            "statusCode": {
                "type": "integer"
            },
            "responseBody": {
                "type": "object",
                "properties": {
                    "responseInfo": {
                        "type": "object",
                        "properties": {
                            "reasons": {
                                "type": "object",
                                "properties": {
                                    "code": {
                                        "type": "string"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    },
                    "data": {
                        "type": "object",
                        "properties": {
                            "list": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "string"
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "type": {
                                            "type": "string"
                                        },
                                        "logo": {
                                            "type": "string"
                                        },
                                        "banner": {
                                            "type": "string"
                                        },
                                        "is_banner_dis": {
                                            "type": "string"
                                        },
                                        "is_pc_dis": {
                                            "type": "string"
                                        },
                                        "is_app_dis": {
                                            "type": "string"
                                        },
                                        "url": {
                                            "type": "string"
                                        },
                                        "tpl_type": {
                                            "type": "string"
                                        },
                                        "sort": {
                                            "type": "string"
                                        },
                                        "is_effect": {
                                            "type": "string"
                                        },
                                        "is_del": {
                                            "type": "string"
                                        },
                                        "goods_count": {
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            "types": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "integer"
                                        },
                                        "value": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
);
