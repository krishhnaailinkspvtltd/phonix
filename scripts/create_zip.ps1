$ErrorActionPreference = "Stop"

$workspace = "d:\phonix global traders"
$zipPath = "d:\phonix global traders\phonix-global-traders.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Write-Host "Gathering items to compress from $workspace (excluding node_modules)..."
$items = Get-ChildItem -Path $workspace | Where-Object { 
    $_.Name -ne 'node_modules' -and $_.Name -ne 'phonix-global-traders.zip'
}

Write-Host "Items found: $($items.Count)"
foreach ($item in $items) {
    Write-Host " - $($item.Name)"
}

Write-Host "Compressing archive to $zipPath..."
Compress-Archive -Path $items.FullName -DestinationPath $zipPath -CompressionLevel Optimal

$zipItem = Get-Item $zipPath
$sizeMb = [Math]::Round($zipItem.Length / 1MB, 2)
Write-Host "SUCCESS: Archive created at $zipPath ($sizeMb MB)"
