#!/usr/bin/env python3

import logging
import os
import subprocess
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
	current_time   = datetime.now()
	formatted_time = current_time.strftime("%Y-%m-%d %H:%M:%S")
	fileName       = 'iptables_' + formatted_time;

	# save the stuffs....
	backupDir     = "./iptablesBackups"
	backupPath    = os.path.join(backupDir, fileName)
	backupCommand = ["iptables-save"]

	if not os.path.exists(backupDir):
		os.makedirs(backupDir)


	with open(backupPath, 'w') as backupFile:
		subprocess.run(backupCommand, stdout = backupFile, check=True)
	# result = subprocess.run(backupCommand, check=True, shell=True)

	return fileName





if __name__ == '__main__':
	module.start()