#!/usr/bin/env python3

import logging
import os
import pathlib

from pineapple.modules import Module, Request


module = Module('ProxyHelper2', logging.DEBUG)



@module.handles_action('routingToggle')
def routingToggle(request: Request):
	return 'Something'

@module.handles_action('hello_world')
def hello_world(request: Request):
	return 'Hello World'


	# toggleSwitch = request.value

	# if toggleSwitch:
	# 	return 'Routing Enabled'

	# if not toggleSwitch:
	# 	return 'Routing Disabled'



if __name__ == '__main__':
	module.start()