$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path public\fonts | Out-Null

Invoke-WebRequest -Uri https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSerif/NotoSerif-Regular.ttf -OutFile public\fonts\NotoSerif-Regular.ttf
Invoke-WebRequest -Uri https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSansMath/NotoSansMath-Regular.ttf -OutFile public\fonts\NotoSansMath-Regular.ttf
Invoke-WebRequest -Uri https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSansSymbols/NotoSansSymbols-Regular.ttf -OutFile public\fonts\NotoSansSymbols-Regular.ttf
Invoke-WebRequest -Uri https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSansSymbols2/NotoSansSymbols2-Regular.ttf -OutFile public\fonts\NotoSansSymbols2-Regular.ttf
Invoke-WebRequest -Uri https://github.com/dejavu-fonts/dejavu-fonts/raw/master/ttf/DejaVuSans.ttf -OutFile public\fonts\DejaVuSans.ttf

Write-Host "Fonts downloaded to public\fonts\"