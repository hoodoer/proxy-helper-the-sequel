#!/usr/bin/env python3

import logging
import os
import subprocess
import pathlib
from datetime import datetime
from os import listdir

from pineapple.modules import Module, Request


module = Module('ProxyHelper2', logging.DEBUG)



@module.handles_action('routingToggle')
def routingToggle(request: Request):
	isChecked = request.toggleValue
	ports     = request.forwardPorts
	proxyIP   = request.proxyHost
	proxyPort = request.proxyPort

	if isChecked:
		# Let's do this:

		return 'Oh boy!'
	else:
		# Turn off forwarding
		return 'nope'



@module.handles_action('backupFirewall')
def backupFirewall(request: Request):
	current_time   = datetime.now()
	formatted_time = current_time.strftime("%Y-%m-%d_%H_%M_%S")
	fileName       = 'iptables_' + formatted_time;

	# save the stuffs....
	#  These end up in /pineapple/iptablesBackups on the device
	backupDir     = "./iptablesBackups"
	backupPath    = os.path.join(backupDir, fileName)
	backupCommand = ["iptables-save"]

	if not os.path.exists(backupDir):
		os.makedirs(backupDir)


	with open(backupPath, 'w') as backupFile:
		subprocess.run(backupCommand, stdout = backupFile, check=True)
	# result = subprocess.run(backupCommand, check=True, shell=True)

	return fileName



@module.handles_action('deleteBackup')
def deleteBackup(request: Request):
	backupFile = request.backupFile 

	backupDir   = "./iptablesBackups"
	filePath = os.path.join(backupDir, backupFile)

	deleteCommand = ["rm", filePath]

	try:
		subprocess.run(" ".join(deleteCommand), shell=True, check=True)
		return "delete command: " + deleteCommand
	except:
		return "Delete backup failed!" + deleteCommand




@module.handles_action('restoreFirewall')
def restoreFirewall(request: Request):
	fileName    = request.filename
	backupDir   = "./iptablesBackups"
	restorePath = os.path.join(backupDir, fileName)

	restoreCommand = ["iptables-restore", "<", restorePath]

	try:
		subprocess.run(" ".join(restoreCommand), shell=True, check=True)
		return "restorePath!"
	except:
		return "Firewall restore failed!"




@module.handles_action('getBackups')
def getBackups(request: Request):
	backupDir   = "./iptablesBackups"

	backupFiles = os.listdir(backupDir)

	return backupFiles


if __name__ == '__main__':
	module.start()