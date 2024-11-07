// Code generated by wit-bindgen-go. DO NOT EDIT.

package conversion

// Exports represents the caller-defined exports from "grafana:plugin/conversion@0.0.1".
var Exports struct {
	// ConvertObjects represents the caller-defined, exported function "convert-objects".
	//
	// ConvertObjects converts objects from one version to another
	//
	//	convert-objects: func(req: conversion-request) -> conversion-response
	ConvertObjects func(req ConversionRequest) (result ConversionResponse)
}