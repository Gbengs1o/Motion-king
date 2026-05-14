$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$electron = Join-Path $root "node_modules\electron\dist\electron.exe"
$icon = Join-Path $root "assets\MotionKing.ico"

if (-not (Test-Path $electron)) {
  throw "Electron is not installed. Run npm install first."
}

$shell = New-Object -ComObject WScript.Shell
$locations = @(
  [Environment]::GetFolderPath("Desktop"),
  [Environment]::GetFolderPath("StartMenu")
)

foreach ($location in $locations) {
  $shortcutPath = Join-Path $location "MotionKing.lnk"
  $shortcut = $shell.CreateShortcut($shortcutPath)
  $shortcut.TargetPath = $electron
  $shortcut.Arguments = "`"$root`""
  $shortcut.WorkingDirectory = $root
  if (Test-Path $icon) {
    $shortcut.IconLocation = $icon
  } else {
    $shortcut.IconLocation = "$electron,0"
  }
  $shortcut.Description = "MotionKing"
  $shortcut.Save()
  Write-Host "Created $shortcutPath"
}
