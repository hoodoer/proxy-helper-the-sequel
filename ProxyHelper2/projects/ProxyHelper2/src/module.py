#!/usr/bin/env python3

import logging
import os
import pathlib
from datetime import datetime

from pineapple.modules import Module, Request


module = Module('ProxyHelper2', logging.DEBUG)



@module.handles_action('routingToggle')
def routingToggle(request: Request):
	isChecked = request.toggleValue

	if isChecked:
		return 'Oh boy!'
	else:
		return 'nope'

@module.handles_action('backupFirewall')
def backupFirewall(request: Request):
	current_time = datetime.now()
	formatted_time = current_time.strftime("%Y-%m-%d %H:%M:%S")
	fileName = 'iptables_' + formatted_time;

	# save the stuffs....


	return fileName



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