#Requires -Version 5.1
<#
  Deploy via Git clone/pull on the server (no local tar upload).
  Run from repo root: .\scripts\deploy.ps1

  Env:
    DEPLOY_HOST     default ubuntu@43.133.43.126
    DEPLOY_PATH     default /home/ubuntu/breedytech
    DEPLOY_REPO_URL optional; default: git remote get-url origin
    DEPLOY_BRANCH   optional; default: main
#>
$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

$Remote = if ($env:DEPLOY_HOST) { $env:DEPLOY_HOST } else { "ubuntu@43.133.43.126" }
$RemotePath = if ($env:DEPLOY_PATH) { $env:DEPLOY_PATH } else { "/home/ubuntu/breedytech" }

$RepoUrl = if ($env:DEPLOY_REPO_URL) { $env:DEPLOY_REPO_URL.Trim() } else {
  $u = git remote get-url origin 2>$null
  if (-not $u) { throw "No DEPLOY_REPO_URL and no git remote origin." }
  $u.Trim()
}

$Branch = if ($env:DEPLOY_BRANCH) { $env:DEPLOY_BRANCH.Trim() } else { "main" }

$repoB64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($RepoUrl))

Write-Host "[deploy] repo=$RepoUrl"
Write-Host "[deploy] branch=$Branch -> ${Remote}:${RemotePath}"

$localGitScript = Join-Path $ProjectRoot "scripts\deploy-git.sh"
if (-not (Test-Path $localGitScript)) { throw "Missing scripts/deploy-git.sh" }

scp $localGitScript "${Remote}:/tmp/deploy-git.sh"
$remoteCmd = "chmod +x /tmp/deploy-git.sh && /tmp/deploy-git.sh `"$RemotePath`" `"$repoB64`" `"$Branch`""
ssh $Remote $remoteCmd

Write-Host "[deploy] done."
