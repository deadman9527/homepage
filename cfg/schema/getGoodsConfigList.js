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
                                        "nav_id": {
                                            "type": "string"
                                        },
                                        "goods_id": {
                                            "type": "string"
                                        },
                                        "goods_banner": {
                                            "type": "string"
                                        },
                                        "is_pc_dis": {
                                            "type": "string"
                                        },
                                        "is_app_dis": {
                                            "type": "string"
                                        },
                                        "sort": {
                                            "type": "string"
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "is_effect": {
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            "total": {
                                "type": "string"
                            },
                            "pagesize": {
                                "type": "integer"
                            },
                            "total_pages": {
                                "type": "integer"
                            },
                            "page": {
                                "type": "integer"
                            }
                        }
                    }
                }
            }
        },
        "required": [
            "statusCode",
            "responseBody"
        ]
    }
);
