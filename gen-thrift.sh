#!/bin/bash

node_modules/.bin/thrift-typescript --target thrift-server --rootDir . --sourceDir ../ios-live/WebviewThrift/thrift --outDir codegen calculator.thrift
