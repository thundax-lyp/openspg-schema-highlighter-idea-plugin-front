export default [{
	url: '/openspg/api/schema/fetch',
	method: 'post',
	response: () => {
		return {
			"code": 0,
			"message": "success",
			"data": {
				"namespace": {
					"value": "SampleDoc"
				},
				"entities": [{
					"name": "Chunk",
					"aliasName": "文本块",
					"types": ["EntityType"],
					"properties": [{
						"name": "desc",
						"value": "Entity Type Description"
					}, {
						"name": "properties",
						"children": [{
							"name": "content",
							"aliasName": "内容",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "TextAndVector"
							}]
						}]
					}]
				}, {
					"name": "HealthFood",
					"aliasName": "保健食品",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "DiseaseCategory",
					"aliasName": "疾病类目",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "ExaminationTest",
					"aliasName": "检查检验",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "HospitalDepartment",
					"aliasName": "科室",
					"types": ["ConceptType"],
					"properties": [{
						"name": "hypernymPredicate",
						"value": "isA"
					}]
				}, {
					"name": "Population",
					"aliasName": "人群",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "HumanBodyPart",
					"aliasName": "人体部位",
					"types": ["ConceptType"],
					"properties": [{
						"name": "hypernymPredicate",
						"value": "isA"
					}]
				}, {
					"name": "SurgicalOperation",
					"aliasName": "手术操作",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "SpecialMedicalFood",
					"aliasName": "特医食品",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "Medicine",
					"aliasName": "药品",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "MedicalInsuranceReimbursementPolicy",
					"aliasName": "医保报销政策",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "MedicalEquipment",
					"aliasName": "医疗器械",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "Doctor",
					"aliasName": "医生",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "Hospital",
					"aliasName": "医院",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "Vaccine",
					"aliasName": "疫苗",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "MedicalAdvice",
					"aliasName": "诊疗建议",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "Symptom",
					"aliasName": "症状",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "ComprehensiveService",
					"aliasName": "综合服务",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "MedicalTerminology",
					"aliasName": "医学术语",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "Indicator",
					"aliasName": "医学指征",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "Disease",
					"aliasName": "疾病",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}, {
							"name": "complication",
							"aliasName": "并发症",
							"types": ["Disease"],
							"properties": [{
								"name": "constraint",
								"value": "MultiValue"
							}]
						}, {
							"name": "commonSymptom",
							"aliasName": "常见症状",
							"types": ["Symptom"],
							"properties": [{
								"name": "constraint",
								"value": "MultiValue"
							}]
						}, {
							"name": "applicableMedicine",
							"aliasName": "适用药品",
							"types": ["Medicine"],
							"properties": [{
								"name": "constraint",
								"value": "MultiValue"
							}]
						}, {
							"name": "hospitalDepartment",
							"aliasName": "就诊科室",
							"types": ["HospitalDepartment"],
							"properties": [{
								"name": "constraint",
								"value": "MultiValue"
							}]
						}, {
							"name": "diseaseSite",
							"aliasName": "发病部位",
							"types": ["HumanBodyPart"],
							"properties": [{
								"name": "constraint",
								"value": "MultiValue"
							}]
						}]
					}, {
						"name": "relations",
						"children": [{
							"name": "abnormal",
							"aliasName": "异常指征",
							"types": ["Indicator"]
						}]
					}]
				}, {
					"name": "Others",
					"aliasName": "其他",
					"types": ["EntityType"],
					"properties": [{
						"name": "properties",
						"children": [{
							"name": "desc",
							"aliasName": "描述",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "TextAndVector"
							}]
						}, {
							"name": "semanticType",
							"aliasName": "语义类型",
							"types": ["Text"],
							"properties": [{
								"name": "index",
								"value": "Text"
							}]
						}]
					}]
				}, {
					"name": "Space",
					"aliasName": "场地",
					"types": ["EntityType"]
				}, {
					"name": "CableProtectionPipe",
					"aliasName": "电缆保护管",
					"types": ["EntityType"]
				}, {
					"name": "SpecialLightingCable",
					"aliasName": "专用照明电缆",
					"types": ["EntityType"]
				}, {
					"name": "Runway",
					"aliasName": "跑道",
					"types": ["Space", "SpecialLightingCable"],
					"properties": [{
						"name": "relations",
						"children": [{
							"name": "contains",
							"aliasName": "包含",
							"types": ["CableProtectionPipe", "Space"]
						}, {
							"name": "contains",
							"aliasName": "包含",
							"types": ["SpecialLightingCable"]
						}]
					}]
				}, {
					"name": "Runway2",
					"aliasName": "跑道",
					"types": ["Space", "SpecialLightingCable"],
					"properties": [{
						"name": "desc",
						"value": "a good idea"
					}, {
						"name": "relations",
						"children": [{
							"name": "contains",
							"aliasName": "包含",
							"types": ["CableProtectionPipe", "Space"]
						}, {
							"name": "contains",
							"aliasName": "包含",
							"types": ["SpecialLightingCable"]
						}]
					}, {
						"name": "properties",
						"children": [{
							"name": "name",
							"aliasName": "名称",
							"types": ["CableProtectionPipe"],
							"properties": [{
								"name": "desc",
								"value": "子名字 CableProtectionPipe"
							}, {
								"name": "properties",
								"children": [{
									"name": "firstName",
									"alaisName": "名",
									"properties": [{
										"name": "desc",
										"value": "名"
									}, {
										"name": "index",
										"value": "TextAndVector"
									}]
								}, {
									"name": "lastName",
									"alaisName": "姓",
									"properties": [{
										"name": "desc",
										"value": "姓"
									}, {
										"name": "index",
										"value": "TextAndVector"
									}]
								}]
							}]
						}, {
							"name": "nickname",
							"aliasName": "昵称",
							"types": ["Text"],
							"properties": [{
								"name": "desc",
								"value": "Text"
							}, {
								"name": "index",
								"value": "TextAndVector"
							}]
						}]
					}]
				}]
			}
		}
	}
}]
