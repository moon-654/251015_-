const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const meridiemEl = document.getElementById("meridiem");
const dateEl = document.getElementById("date");
const timezoneLabelEl = document.getElementById("timezone-label");
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const mapTitleEl = document.getElementById("map-title");
const mapHintEl = document.getElementById("map-hint");
const languageToggle = document.getElementById("language-toggle");

const cityElements = Array.from(document.querySelectorAll(".city"));

const worldMapEl = document.querySelector("[data-map-image]");

const worldMapImageData = "data:image/webp;base64," +
    "UklGRjxlAABXRUJQVlA4IDBlAAAwkQOdASoIB8ADPlEokEYjpqOpIfZ5sSAKCWltxLNoL7TMu/q7Cf//adI6G+rwo+evCUD5VPiP0HAK5HTf7t+t/7f2z/09" +
    "d+4v/jz5fw9Pbsk+Tci9//+XJ05fLZ6Y//36ev8z02f93q9eZ+h1yfRfaj/lvX4m0xifzTj0/xP0A/Ph60PSl0+sc9vpP4f/9/VD8N/1f/3/zvP38b/j//Pn" +
    "+be/nv/3x4/8PMP//+i/4FqdY1gKWJ0onHw/Kz9pXG+D1MESCMZTldrR2fbDH2RxyxzzRZhSqW65N2B4TZWEPszbqXalAVL3/trf1NU4cd82o9bI+y1275NZ" +
    "VB2plJbK1M2Cj6e9jCRpP8bbeOA7qtNOFdJV1ingQ1E9BChEZCNIBllYApfPpiGr3UTKUVIPw/kkPVd37iBQz0Q32D/hjZZv/5IP3VspiUKp7zxu3mSFBNO5" +
    "hPTts3sH1YgXqFL6rFM6ME1EN7JsM7h4uNPLpCrpwiGGrr/zj/RsKRbyBf8S4rOFqz6NZyEkJGBh96ehGPXWxETkesKL/j/osW6fHXvYG9aIQDrdxePibtR7" +
    "9uKm9dlg4Wqal7y+cGaFLrDnwBNFusHCkTKcjctsx7pg5D3vlOg66lx6DUuPa+uEjHtaKRukO3scLRtCmfRGut+4hNEDBRXQXnKddBFv13LsvU2oQOzBfQN2" +
    "QpuOoGTBCz+PbEcUtzk6EFWULfwdUbeDPZlo/yU2ZtrSeiWj+RaSplORuW0NHgv+5t3oCiFlZh0vHRvMmhePdFz9f12OmuPKz6zBHj6gRqn171VfLwG+heAz" +
    "YPHzBrycITdG1whmQ3Is94SlN5SRpG/Jfw2RVy3i1als/XWFqA/pImhQ/WbgzNovAEJurPokauRMELzkTZFwRYgb2CMWrhLQJouHel4X/w7sY6Cjr5SRpELQ" +
    "BLUnnwcUtzk6QvddwV6Cjrt78Crelrgc/tuFP6erJLr5mly1luNPOleGdDJghGg6+vQvFOCqim6QaFOfmAhiLfx6QnqF4RfUH9JD89hxSRu0oaPH7oZM8GfR" +
    "u9j1hX0gcIJdgfqy0mBluL1KMcH54gddRC9IA1vvqpoTC9rqHkeqqbJy05HxYaS7R9j+JDrNvz3ejWAQwJsHCkJIp0HR2u/HmC6WVCSyhwVdO5k045ICmFJJ" +
    "59aO0rfVdW1DFnGbeEThMo8S2LTfCu3VD5OMJ+H72/VJIPwKmrQh+MtuYzj0GoiB1oroOtEiBgopG6Q7exHYg0wCGTE3aj37cVOxb+8l+Pb7gzQokGOAEtSE" +
    "98FmxX3STL3tpXypnSIWgTRxavQeNhn013mcTJFuB5KSoScYS4LgvSQRn2ZNhBx4S1w+3LnJBTybwG0Sr941a4+5mFNfzg+A4UGhZxRaY54JUTATTkCyU9Z+" +
    "Biftx+FIk7EkitPXnf4VsblUj2/eCo8AH2UzeRQGYHDtW5ghFDaR9l7UZIYKkLgTkAOmFtK+VIyq0/zNTSvjhx9L4Bd+jvJ+W6H0LQm3wSYZMELQm3wCnk2j" +
    "dkI5VnOVjU0Kc1xE+lfcmzJqTWfF+d0JVmjXhhVG2hzRLmeZCX0KKcrEr41gCsvNMStqMfHT+0M75HFrC9GI8fUCAU+jyKFtby8BeQ+w9ACCiCFHyGE3+Pbr" +
    "Gqg+acU00lghCFqMS3rRnIUWL6qf3t/mIrOCRY6TjM3uJwpG6R5E3+u/XqcobBxR5i8j6N4lS0lAVSu6HV9n/RuFW5y0fVBnEy+WOLCPq9z8moOnBvr3nyfu" +
    "4Qd3bJpkrpC0CaLOvMmEF4iV8rPZqWr4x/ErwbBJg+DT99osC22mwiViTF0WB8OH+D6UeG4j0XIY6tI8JWCX8m5LF0TXkN3RtBs7GYtF1fCnq6Z9bkA/pMHU" +
    "sCC+7gW1aJo90zQdyfWvE2+I93BU7S7rY7rl51buE00mtL3xrrnWcnqM53rZ7qiMcYISUCNqL7AaFy4x/DZXCZzMwQu5qbXCTNOKAA6F8nl/iGVoAFAYAohp" +
    "p62byFT3xDT7YynEtNgUy7OmlWIc+kOnIFxsso5fZSyXeFj22WPQ1UwGvvPJRqcr2BXSmAzXxMsuj+krPOptyMo82oT2aix7AlPR0juMmPLfoj1oKFfQHkJJ" +
    "ZLp3As7gIr5ZlbYBN7VR05bCtIedmy/UdzrMaEVGgo39tmsrg0FNcYa8sC+LK646i5yNcDmJX48OHirSvZ8bwdE6Rc10B2Sb2F7kjPsQQ3h62Ayu4uA5Zvyi" +
    "11OCFtsfh9F3Byn6ZSMuj2IFtD39gjPSApnEoH68eijA7sBCU+B4qd6QwHZI4zh68KV9kyAxrtuzehGFNfnTyJ5u+TU8edPDHwI8S0cjQegPS7lgqm+MfKkc" +
    "x10MJIHBReE0rjUmWFBHgIdwh860odp8nC3PFtgv0gbrsrSHS4mAFdzypOp9d9Q5K2mGyYLWZiR4FJUB6CFCQu8RDD3CwXoLa2TMouoFfurJ80QZzPXhXAYE" +
    "9W/RXabfu7WAdtlh/75h6NoRDqkdlPXZPdDskhrVWkiu8w9pN1uHTwF9BCpcnTtEJa6/yCP7OXnAb0e1/dDIXM4tbS6fxoSruMtxqbr8MJSzDYfNJb/ISykM" +
    "gZm+fA9ebBnlMzNfaIyHVsx+xsf7IiGqb5sKoR3tMyU2vhe/Gn5dCLuo5iX1lArdX2DGww+xvEbSdhoi3HQE+8AQGkd7+Hs06eqh7PMNpbRQHw0vdH2ri5a8" +
    "7FV1JY/1FBtAIl2Rd2VZuf7OMfHOKGRPto7/pWlYSKVOWVy6OWN4/HMFugup/siszkr48MScj9xCd81DdnBTgXgnSsad+Rh69p2RZAYgVWP5t06yw66wloAe" +
    "6NJ4Vf3m5uwK2eqN2FZ5iMJrI+6jct9wje2lhrJr+LwDAeN8DdC+AR4MF+jHjFx+EdGxyTtCfu2ET4mzClN8V+wTzYOfTUtpx1lOGPgWB2yyv5C9jpF2/Oyv" +
    "FxDY0hiUdH8kVGsr8E8rQVhpFDe0EIL4XSDM4KI0xr3Qk9RBvll4sZm8sg4sIvBemDaWAaWhMuRf1l3vgdJ9tjgStJuxgqJMui99lgaV9g8RRpZY6aOBunZV" +
    "YHPycN8OyR457BXYKD+5bCQqIR2WTOb97zwstjYqw/ROy+qOtDOCCXdQ0E1EK3gbhVRXxLu8MyYgoTlXTrLeT9o0jmu/hy1DB+kFydYCG+8ATuyHRDMhiQS/" +
    "CK47Y1zqSR+OyXtPkQKEc3oIHAIASKf+j2PgbZ+wKik6NCjosLIEx8NSppr1nS+ahxyUEVsMOEsgshper93ccIyGN+7E1fViKrc0NZc0NUb6X6dX+nQk+RSY" +
    "Q1a4un7ZmeNc6a4zXADoHxmUnxwJjdrK+e0i8jwRzBf8LKdRoAUJbqbddoOY4ncVATobsS/CAMVTINjb4aUDV7tg85GRaVcIDHFVxq114t/ner5H4AyY/yQ1" +
    "L05Z/+FSM/VZrm2z/U2AwEDlGYK28hkAEs8aVNeHeYu4vfJPgY5HXVr9fFaFI+qoBcba+MPwffXeTaLn7N+HI6c/kVXy1IHY6Rt7HQEluvgvU4H2wmJHxsq7" +
    "j1f6dGOBv1pWniujYb+6nf+qckD1RTJaTFafLtOR9d9Akd1AadHktu01m4bRUlzPOxjrZJOFjertQWO2uGP9DKzLYqm/JmUzJZXLIgKTCdDThrJzjV3YBrqR" +
    "SQk75+W/KTzJV/i3SgDE763xgNYu3Y/TeOT09dYO+dIAMjQBNEkmSjbD5woA4ZPBXTVeCocj39v9JV7HX4dh6nIdkJCpcCjpEFfjc+lpaCr+GU//T5v0Hx8x" +
    "18e/7B2aBNPlHDBQDldWrRhL1aYsGnDTU9eQDF4G7BbAa6pvlMT3bpYga/q/2OQ+/W7JnF6X3EosE1yH0iunChiMk0sVy1p46KaeOimgT5xovS4cYF/RUWxo" +
    "FBJ2WnvGDexUO2QzHsMwhF2Be7cttjeK89eeu6LzfeM2V1mKG9oP8J19yjc4BEg95xf5LqAkgS1HeQY7afeYVeJUW0YzLZBz3sxBJPlvF6+v3PGifRFUCAaO" +
    "RUVACpVGqJ78auA/Q0+2b16f414AgZgQsNZhbGh0RYWoGfNcLkVb/Dhbf7oxZIM9uzFpMtcDO6hoIDodd9vJ7QuPlQYanXRXqQ2dXalsp6e7kJ2Tpq8k3OcO" +
    "MpH5G1lXXHUZOzc0uoFloxwhHGrevj/G8moKH6wW62Ul75jY+lPVSg+I3k4DzBt04PYF49LJgL59O9/mpvsBUhIVLujr+vVdfZp6fWfznAbArOAxPgZHazYU" +
    "fpd20o7+ldi9UBGw0rvwyEVV7UYr3zs0D6v5VVwx3h4W5UgH5Xm49rDzAursh9eF7HbNQTTXvAafiCMAc+CN7s6ixSshZdZ4cgV9ko2AUWso7FdVNNNqa7WY" +
    "A2zMURHweCPZo5tvA6Ajj0dNFu9hujXZUWxDtSfPPgzQLun6KtWP1AvitUAykeRSdIIPzx3r1fGZmd9FL0MrZNQ8jXbbX3sTOdlPU5TEckzYCMMKlMzPTUQk" +
    "ZlEesFk+j02VgVAKgFPrf7k8R94SzCvekAdRGEw92bhTJUcMgRRDTOL22za1dbuI9BKk/oSxUodkEWTanDpJLCxJx+rBAz5kuv4Q5YH+sw8nIKASytBjRaE1" +
    "SG70sHyPR+Y+OBvHHymahRSB4E/8aB+9dA/i1UgYHJn9kvCx6oJrvBD8QNNrxou/laChCgnyB6aOnVMPbJee3RqloZkGvFSih2U8pWqdvhTf6kAud4gMjlH+" +
    "knx7H9Ko3bkax07g3bbbwEGkQhIVLwAnePKjyLqobJtrK4szkr4C9wcyktbQarOPhtHazTG+ynrssCa70PR0TnSqIvtGVtAS/SH80r0W99PfpHqVcm51J/UN" +
    "hHmQbv8DoXmraWfE0XDG95+MFrqmWfYK2aQTTsn70Uwtb8LDNHwP8iJnQZ/JDjZUk+CBGp487K8eqv6cBsbRNO1XwGg/2o7YqgOw2K8bsSAyoiGFlqo7TAAn" +
    "V/IIX5KrHNbJWZbTwNH9tND7HlIqivmGkavRdwzqrJ7d4Q8AQ4WAQgP2TOtXZNAvLkQwq7Zmok4KMp1T4ITlCraWYZE6cwqCQBqfgoHZ2ZcZTBBZUWxx8Yqo" +
    "TOBdYjNOgtmAfblWQjlT/wLuLAu0BWlHQauGTBh9Z2v8q0kQJYTJpgeixNPwfW6YBFn7NlfPlCkLcqpFp0sKlv2Rv3toWnQoIvM0lTltdNUD6xwIrRz2ceLv" +
    "k1Nh1+avziam1nUUGD2no6BOz346nchdcYbXGG+ZSgF7vo67adS0MH+d3p3n194ppMMrQnVxZfZ8wxeyyaYNKp90lM1H1EtFqI4bNVKBSRZYdx8JTetjw6Ew" +
    "nF8v34GUYLDqFhHlKtVGjZBZq2icWuTepROrVFhpm14+r8Sq+Uu1BoR4qCYc4cS31d/kTvUPT0HmHuiODEvJZu/if2Rxyxx8+B+3/T2XF2/qHcjDtVQplk+X" +
    "NdWtT3tc2hmgZNpfd1+IYFAbo1C2wIrSrd2FIoiZeLgCupqEC7YcRelqm/a9Xdza1L7MgJmgHWdqvNBM+gc11r/So/9k7hwlJ/0cYJQzSIV0Nu8oOvlmQGQE" +
    "gTNKdLCpCQpNKthTDkSDTqTTXKoNFBXe2Hi8LaP+TWM5607RwjOK61uQJ9wMP+PKZw5ceksXt5yvoD/tH54bjmO7BSNNHigle1r0VrNGZfscFFsNIOcAdprJ" +
    "rMvxkw6iT0Z7wIIi6mBQpVRiKhdsiiug87+R1lZDcZJJ69KKbbKqxXZxfx9YNCTtz8mqVWDFXy4tr6jWbnLpzkcUHzKi5ql5fvy1nzaBoFZ+XwOAZ3l5MNLN" +
    "+115m4+QQkJQqMMjh4E5jL3kkt9K1z0CLCHU/+nuuO4gQzr3DA3/BFF6plQRTck4qPdmxpiYEoZBmzdHeb3aN5ZH+ERO50M10TBW9KcZPk173qz6p6ONFFas" +
    "hnh2B27nwriCow3DaP5KvU7KcyjvNtRRpQpfGJPjFFA6ak41ETspd/2OkrYLkVLsdZjn/14inpwLy1VAzq6fCPNT53+VY0IPIitjjrTKvksfG5FCR3CDZjiK" +
    "lU5H2c0xTrI4ORXNjPfwpsLUlSN2VF7CjZwM9TOKY4SoDSB9IaIg8oqh6IEeuzXoSJGwNv9EVRIJQdoNDiCHOe1qqqdlitQYP66oHgrLAdaw22dHOX/Km9eI" +
    "/UeLe6i29cAT9P1ej5KZO+ani6K1iPFo4kE+OEj2AtpBQrrKU7KtHTbjnxAatcSA4Fz9Q9rORg7U+GN40woPe8k9RQaTWV8QCHVBFK5/uyotOKr6EtuuOzF4" +
    "WqplFR2fudXRT84d/KGN4XjNSiyyvjuTCQs7JYGoJLFsnuo8LOaDDAiJxKYz01+tFXH/TtU2j4mSB+2tpIWNLSuYbEI24L6dePbdEVGnectgWKPAJV38RUj9" +
    "U/WFG47wC4RFIeKK15I4hCqVO+YmPOQ5nig7pwR3ucJunrM8xxaf2TnGxkcfaD0wvYZFDIkzTA37x4Y3PZSmErFRM0hOpDvEOBe+TXGBJtN8Ij2vNzD1BZnR" +
    "GYpvNQEPiLbD84rwD1yP8HImQBudLp+LbpLaKtrJOhUzs1UwBc6KFgwzpGweLV27LJH/funBfTX1x4UCBqXb231nuhjy+yMBsnX5dt0hztIDpvkm1q1dgL8o" +
    "ZcH//ax5ozAftaP6oBYgQKw+XDfUaOFw+mM/zOZbhJiK3Xcmx5uVlfu9k1fxZGnnguskCqUvlefJODsbC+BPz1IoUKYPPfF75fY/lcl3nE0Iwd81DEyG4jFU" +
    "govHIXiSB0d5/0Z7qGAzBGDmnUlfz/qqcjHL6oq3I2zhwktZoMaFBKKaiOWeugyCMWZ7ZcL51QzBckkx48d3AH7GvHraLC1Tsro1OBHCh03n/naD2k+smJHX" +
    "a1po+h22kb+G8ks8t9r5aEf7CxaS0pIdFKadJP/eVu8TVIAOxjCbdRLJPhwmAK7ei9VcpTwD3IPpIA2vOVXT4QuhURAdTOF6n2XMqJgXRTb9vWsj1/D/2rg8" +
    "JjHHSXIk0Azj9XqY6oBXsrzYDkg2bx5ZK64wfKmhBo/cQnfNTgN/EtMzai5d4030M356d+41buCAbNs/ZRI+ljueVh/GFBvCGfECusYIFqvzWIl6enik1AMj" +
    "B3PxdX5MGdLZxlCXKpVUFpb2SwPxl/sR4V7bAzWz9eHZT0Yau/02kfRx52V4ugkKlwLnC0d/w3WaiWcNobOGxo0YlFRkJv6MGYDRGd0nTqQsuPSo2YkgFW9q" +
    "e/hXniKMnGhFlPW/e88LpVpzmhfqtGvbGXZOPj+XO4685MJ49cecEmmkt07arKgbBbXRiXbvjnMdGNGuBGsrxcGuJM5v3vPBDF62OTWyAKijZkStCzNP91iT" +
    "EPna1WhgDnr3dlPXaAYPyEzBpbIu/i3+hzDKX3wcPGLbXT975EmuQEleZs/HeD9PrlmEoTZ/BlzmPdbPNG8RqePMGq31vDTjkTJJVvAA1aH13LTa8YGaUcD4" +
    "q/lhu6cNkbqTHSwouvccevM+uyZw4bT5TpYJrqR9dlLwwS6+Mta5mp48w2uMGq3mJ28bu3u68ZUN8jfqzSVDEyioudzPDqZC73Z26ZKUKIQJd4BZb1nS+Hfd" +
    "ghWMAKmXT3IDziA36qCMBo3dv+xx/r41ztawqXgA7tbSeUeAdefBZT0n72GjeIwFQcpo093eCYU2kXaPmrf4Tsp668Ykw+IwNVvpT4ZekDgXbvkwMwB0Zgaw" +
    "qQi30t6ziQ4G/sfiCMBjjO35huYHWQQ4F4JnN9xoITjTZbVbvg4Q2oEJIwGOjAaIdsjdSY91tJ1JnyB3QYbIvBM5158EB5w57vPow1UEsFdQ1b6W3EDgUVde" +
    "AqNcCNZAep04wOE7Qppq4tC8eD+vY/btbZ4c93n0ceYNYVIRaKxdPe2VvTvdPs2Ni7VaOPMNMo7Yh5RUceYbLD9qFDDg43W5F072GPbC1Ycd1hMsvMUNm3Vx" +
    "IpraShbVy3jipvrDZudNT2juZRdwuF8UZMAVc2HcFlYjXZUUZ7Av038ExsGZ8EKqy0Q35af5OgvAX4V3OYiH5uWre3RKN/J0uoJjH74uoq7LEGUTQqzGYZ6L" +
    "Fqbt4wLrEPglg7R1d9sMrTHV+LRcJHdSW2tKwlvqNAthyc0ZldV/YNDS2fipakfT5Z/Jhfet+PuNDXoIR59bwydkFYUaK8IwS7up5CAvKPQf8fB3nZxGtwJV" +
    "7dvS49CPaPYTNbZZrNyEYcJ71plh6UcwRqiRY5Xy/lCFJ5b/E2NYCkZx6DCSb2B+Zqa42DPo6a48qZTPInVX2sSa7LBHov3EISALgjXLEKR65Ymo0IMPmjTk" +
    "CArIhOR9QIBfemCF5pNX+6r0s5XpIfm/UIHwT8nszxK7A+UVLrWAITbxOfcjPUj6XwCoMj6XwAsphH5c2RNmWLxD+HYFlhdKWYmAt+6+PKz6OmuE7G5z7U/Y" +
    "Af1AgFdjhaGNfq4FEKLKTEoRErsD8zPEqhmNnHeHxLD4i2xf9qoMknARq78j6Xxq8AKf7+s6KXz6OmldgzY6KXz6OmlfKfqOmftfXMRt7AsP6SJoU5rjTEL/" +
    "4fkiLjypqTnC2IKhBCcBGrwBCcBGqfHtznAben1CIpbnJ1UGPsvaknY87t8hnnGGwF1J9G8SvlZ9HTSvlZ9HWw24oL7ho+haE4CNCCi1ikWL3V4AhOAjVQZH" +
    "1AgF4AhOAgF4AhL++N7peWcRurF7qoQQm3xq8ALY9yywE/J9HTXHlZ7MtRLYWxD5y3i1cF2e2u2uPKz2Z4ldgfmZ4uNgfqN4uPKz6N4lfKfqOmuPJVJoXJ9s" +
    "zpCGRg/LbdPpFXu2GBq8EBa7i/I/yzb9UkJ2CjQvO7hjz2uk/77QmIHXUuPQaly8RA6O14NaJ11tXw4WcztMXmD8YymhdL8hl2EO1ojgbsHjlruggzNWCie0" +
    "bMDutq9JL3ozsUkJ3HtaJC9rqXQddSvmh4PB8QOui47mTTVuxfzmo5BGLtR+BBzA6igfgURD+l8AqDI+oA6XnSjys+jprjYH5mppXys+jeJXYM9meJXYH6jp" +
    "pXYH5mprjyn5k32vetMELP6gFYfAYWjikWckFQgf1AgF4Af1AjVQZJNvjV35H1AgFQZJOAjVQZH1AjQgqy7A/UbxK7A/UbxK7BnszxcbA/MzxK7Bm6Oyt70h" +
    "4XKolGhB2yQtCbqz3uiKW5Bwfh6oxXwMQfoTxBMr+JXhQX58hHm6RZmgwUPtqr721C1aAFzpOeMaFOgwal0GDUugvv+nDRFnDv8RNSc4Asvh4DYMFJAgF4Ah" +
    "NvDjk60wf1AjV4AgT0/m5Q3EWP4M+1wsxjO6nPSOwM/4fEJCZ5D9VCQmhe1okL2uh/jgQPQaLwOd9ay961RNgHkeY/krVEbHWGm4tX4J/kTS+VEcTmlN/y8Y" +
    "nAPyvDDgSc28TQ3afas4Sdn3IuNgwJpFj1S96QD7y34bbG7QgTrePxEkjZVHwxXoqvf5zYnpnZlzVHfTfA98FyQYCxqwTEvA1z2JM0+e6FrKd8DnuLnJzk5y" +
    "c5OcnOTnJy1PpObWqbVLXA9mxTcZd8MtbFLurpY+S2/5LBwISp+gS4pIEjseeiz0gKsoNBwN8V1rVl/T0CZP8kztXooENLw7+r7p6r74px+7GFoZNFp9mnxd" +
    "paCLAUr7qngXVc1SMOu0tDOQ3bB9hPs8XSMcZV2CJkrCnfQ54oAeiliG8AAA/vuutP+gvMfcVt/9L6v2JWqUzTUMkTWnz0EGwgBpiSlYSKqD4hoOowjdi07K" +
    "8KLSt0+ghKBAxzv8JdV60UKcZ0dYtUho7xnbMyF2xJ4W8gPDxUAMwrCmfHYXqKhINYwPK9tmPth2fdGcXkkXbhuDdHh1qExaz6t+L9M8wl/jFUEE5BNlJRUF" +
    "oql4ehw96Zem3M8cSgBQJm9rgy17uWTyq+i4Uw4sGCxiHYiAhFAncSpxdAfyVwSuaZLDdgpN8EfrGJB1+8c3ZbqeFlZedjbSaO1K5GsryCxdX3wXR3GKIfs/" +
    "lH7SSmo80uex0Ft3gl9jl4aOf3ewP7SVG40r/g4uKwfvpUc5qcRQTgkJcJ3BYACEGwflfDDenBR5MBI3okJoCsMZe4HQiur3tfn30jGKZHi/OPecqvbVBlxX" +
    "kaG6DIT+YGbBMVlKncP8XZb17z39u+MzIlMzdveUgoCcAeH+S8tMshzLUD9S2UQuuQQC4EkXQpjgAt3ys0oPgJJbklLeC0WGiZMw2iz2otSFu5i8V9V2CvpT" +
    "K6POSVFG3cPAL4bt/NLJQP9iVAKu3NV8p0Iny0zuZ+RRAPOVWq+SA1Rn0RBr7Fu4UEYdLBeMlh728rhsmNYWM8/ziPpV003melCVRpXDlxNNF3wMPEyac//1" +
    "b2XHXlgDuT0nfILvSspu6LGKEhWTo2YnoHsg6ueKmEUBS175QcFjtimBxZ2kwgoXDAN4FBw6T5ZLyAp10EKfL3kNJYbokETInBnqMS6FpDb63Jvf8dltougT" +
    "r1RCVIAtEHsJ+p0Eb9xmzk3Kd6qvdPfCAsRpPC+rxN3zLUaFAWO8igNVJjtDDQljhTD6sciwvNIq3LCJjBU/3kS5rQGIXLxlTw45v6hKTnhHtnu4PCxJwQmu" +
    "0NknQWsRyKZV4iR0i31czlyZ65stpmevVjSMSu1AZNAwVrnD+428fG9Kq1D787q/KChto/WmJuJnf1qJc1qfjpSErC0cz7yD78UOJMdB4Z2jmxuzYXq/YpO1" +
    "wiwldqAu8n9mMEpMjcJg7TsZZ3VmCMiXh6Qvx5RtteMcftRp8txyq2dDNOt6nX9ya2vxC/tcEthR58dC2zZ8mrVt3SMvk0QgHAoB3jJSFXlOr20XNA2dweTw" +
    "/mbPxXUMKW/HA/ErAxhLe7guv7Tx+zyYooqI3ctCWJckG3zkC8raYYerpOpTRi0e4InY6DmBssRbh1BJasUIfqshiy0rTHDj1VlGCPVzAUhsD4H/EPso4e/g" +
    "qzyJvI9GIP9M2dKQR0ey43+UVQBitu8hQphAhRK7Ii36NLbEeq48t+zmW1GyJASyhG5jJhl1E3v07349tgbd5IDLjCk0hwb+gMpfLZkqcCN5pQB5FiE+W44s" +
    "gJaQ/McvGGVmELcgSNYEbDMWm7HtXEp5ra7UdLkygljeoZ+13BgHtgsL1TukrCrxF7ubMEoB3LB6wJUD5nnRocEa+URd+iEu7qf5RrkAavdmcc0990ULSl/K" +
    "K9q7cVE7JcU3h1bD2j+DnsLPbIFFT0YKVQH2NeUUkIfP2EQTySYYvG490c6AVZcWxUHxA97GXbVylPKiMfjWSyn5NnCxdqmN4hShyy7NYddxOR7vPUE1WXPG" +
    "4KBXADp1Gog0oDRoOaVMc7O8KIb3SwrvCRNDo7677eW8p9et8q+1sS9NgxTDQhxsRLj1djF4eimUixvP/uZ5pBrLUd+Qx2MVyteaiee/MKG3ba1reO86L27w" +
    "wXAJM9lIYnqujp0eFDuZH4PyIubzUHS7LiK5JstGixahBIoVViHIMwxwf68+P4GpCV3TYDt96t76tqO7F9SBZB22AoD/4KbOpGynN0qnf2BcN/0F3ZeKXqZJ" +
    "ECenHTtiagBAQItcFW+zfdtSRe7r3lnbmmsaMRN1lY2jXfeTXRL81MXbbnUQbjiSAbd+PkvUgVBt/wjjPO1gw0Zp/mAd3A6bwm/cPpCcsqnFfkevh815XEA7" +
    "HEXWPnzl0TkbcwfP/sD5FVo8ycbdYlEvjGkN1iWscFVy8yjyBr6aREksjx6jJ4bM6SxBuNKjUxSWjrcV2u3c1vjMo0XeYzZ54y0m+nw3fQ4be2q/ETVUI8M/" +
    "wHDsEnnM3vZYvUVRG+jcBIV3jH4VDanz7WdyoW2dnxkUmLwedLa11A1VwclGRjLH2T5s5+vwPYPqDEIFAGbcgF4Sk+hshYp8eFSdQIax9enZZSXuMlh7GWdB" +
    "sd9q29titZ088TM+wIMgDyfRhORYE77Mwz+Ck3AvcGxPVBNVi0oVWpIxgkds3MEU3woQ1FWksPFPi592booEG0DSWnYw4ML+8RTaStCwhqKqvt/vlri2UVFB" +
    "WQ0qHukGck7jpEfmzWGWZYu33qIG1Sez0JgENfa5B158gi9bwMK/Pd/riALCzHeGYwx6rP0oZlW6Kt/n+tL5icdw0u1dBIGVD2wH9MjeSBC1VhQ9ns2ZqpZl" +
    "jpKd8DcIevMjzar2b3sj42iv7lv/LNsmyaxywQXJL2vwr/NBc8VmtO7cEfhjSvwtm8/GTnogwlReBJY9HaBDlt8di5WjINnlWLx3EHruJnH0MWviymOP8EBi" +
    "XoeXVMPUHcNvY/GaB7wPuAnZqjN0RGvGuPZ4nHiRfDlvin0zX6Zh9bgZpt8ESPGu/PTmrSCWj9kef4dmiTefMPYNvyMJV0IqMNPiKiE/xat7KEOoTybSPazh" +
    "WlYoixv05DBDe/9g7nEDWBcCXUIY0X5grm5poQ++xH+LcUvu+sEq0mXweNz0cj4YT1uRLau1Jcdu1slEn3H5+h2zrj8y4RMLnmSGMNev2hxaAYYK3wckqoE4" +
    "8VdRdk5tT5SIPaISvY/jVVKs9MxTvhIbxlJ/3zz0T+dJUBIwtKToU5Gu2vjoTf2rz2fEmgvbUQ++vf5pLm5zScBNNW5pzoaMoIQBnQeBySb2EIn054RurR+I" +
    "slpHlCHIHxa+rg/kPYkkOYvSUrcWHmROv8RG7cdzub/rG5O+qYM4dvjEzpE6gwWj/mQnpNRsFlZEjxLXjZblIr5jb13DtjwbRZ9z/3J5mlWBe3MrPlppUblV" +
    "YT8g1h/hP5q629AlRfu6zJV8uEAuDOhTCI/3y+FeJViYvUy1/m/hpoap9MylA0uujX6sY1JSfrOVeqvDadnhGSfeUVPzMaZZc8oc87uj+CASSD7V8xSS8Q2+" +
    "B6h5wLWJjLKeDYcaGuYYC8XsjFl03AE/xGVMRtfYycGnrKKcyDfAKTXru4u/f5KcUust6+ggrfS0dIBfc/mOKWoVedy9kZKV4slx7kNyEL7WqgsuDbWaMw/h" +
    "gjZ4eMMhfXEE7Iuvd2H2felZQUMQGt9iDv+HicFz40DiOEItTU0cXEjAoCOBg/TlMGuARmop+I05OHKiyx5HavHX/I72E+eTgYF1Szw+GLu0bfvl/bwbXnpc" +
    "/ZmPErypZHQN4uevbfjmeF5tNqX9QgCdMoHHc9tG5jOo3ubZAvOj/ZoD0qWyLlPJlWfIWLxfG0+s6MLCkaW5zlM5u/Sh31nysBBVmCoHmUKwHj89B5Ugm/cl" +
    "n+qUE9/VfZTn5R4SzlC3kc8V6MU7I5YaKHmiTlO5aycwDCpx3U4C4Or1Wd5EzA/3A6/GA9SPW05lRpTbqbntkU0FifcA7cs06OZ3vCB92dvruRIKz+n28NlD" +
    "LBlZ2gqZZeBFLzIvD/tfsTSCAL+olG/cK9fQng2gqN/+MTb6UJ0rN0JqcZ4onH6rjGB7LRw27mLY976kfAS8tmRaFOGiJPgFVnZGpZcvq9oR8L8VluHsmwig" +
    "vUVHTP11olamezLN42SrrRYnL59OysOCRcLA9I3d6WVAhLBZgJEG6gvajwNyU3dbHsNZGRcms/G8pfEA2BTa5NkdFaNOZXJn7CiTA3okpMFfs02Il2+1XZqq" +
    "9yMJlsqBToNh1JOMN+I8aIFdMoPTqLVVfGtm7x5/ea+2mdHkOro8GLkjxx53UqRigHhr4vnM4rAvotnXwViAZspq2ndDzSr7fQOpsRttvE56EbDimOAlVYEU" +
    "2IsZs/D2MRjQGeFi24Q7VyVmy/zIHOJwPCr+mcYFVL2oMNslsbmP4LqvUt43YXpoX04HJfNCKhqIA9mamphhh59xNZbiL1G1seyskxl+yxLbkO2NEpwdcYFY" +
    "zIUtlL9Ogd+x9TP67pO6Q/8dwzvDJk3hx5qU6EsJ9zIcZlf5DjC8F3K69SIX7CIe5stW83kUeyzgv9tfTh+NE2m61uL/KHr0Jbfc5p4heueys9iyfLzsVesE" +
    "cEMv416F04jHUlSbG+6BD399n1C1OdIiCOEMBlhLFP0ATC7EnPWOun8Xp1CN6KV9xgKDSz77qfpls/hmYs9VMM3U7y8no4RwmyNeztW7TeBMJsQlDQVSi2yR" +
    "TmCccw+T534WwPHsiPnUqT9TzEM3uRjqkfD21N00Ygx9SU31gkSUdumiPr14HObCdx8Aoxmj3kf287dNMJUbeuzBI4SsOZldT1AWMHhPMd5WpykLI7b5XDT3" +
    "jIS61XzAxfMHjbVnulcY6Yd2ZOsyvGxVRuj30FJKmPUlVmDUyTT78kv2/p7h5p/1sDkMXJJS2TzQVL0YOQCe90i/U0IMJNh6WbVJZUAhf+YW8iV6qMHDzJ0v" +
    "ISlWarm9OuiX2lJZVBzMNjGqYF9cdkrvsOCz95vda6RLx9Ek2Cqxt+f4/NKd1RUSH9QYK4eN+yMJ+JNULCQAOZVKbh1ouFmrqL936bvCmfaXJdovgQQNr14h" +
    "QAMmbYuWPIJuIZCKh35R5HqmBjYj7L/XDk558iqHZTVIw055YO+mbw2chvkjd10kfwel+3TZjuFaMeQbHThDpteYdBBjzNbpzNgPIzCSYl/aYdmTKmjqjAnH" +
    "YfYFIw3zH7eDr7R4ZhSxLk1qEXa8J43Sp5eKhm5SDqIOnBaZlliNbxvIpeJYSHxQmDJfN6HILP/8JAzCgJbk01PLJ5JXao31cKxI5Tu3OjsY9SVJdNd+BCTr" +
    "oWZzS90QEqlVRPnZlnUDgN7CAMPiEo2n70t9QucXXUIqci7+su3YbSXL7JSsCrRkJOHidCp0TNtWtlQktQsfrdyPt45lcUMI8+JoX50LopxOwjRWkV6txScO" +
    "TXX9eIkBmpWPouqEf8MTpbvpFY3sRDav6TCX7NbC5dL0aNVSFU/Lb/526rDS390ve+gs36A+d8xEEAQ+F+MGq5w5DwXIfw7ISTh3J2cTNO3PQoUBdW7+6uJ4" +
    "qnkR1Wc1AidcbiH2D46W80Mm9IwDXuVrjSpUkH4Y/OYICj9GOss9FnSAn9UFbqqIMcVeErGHeNCpNZsRSDRALgiA5zp1vIhaicqSEXQMvYmPa21Iqs+tSkGm" +
    "L8HciOwCcDgKjrbfFR0AS7FRi9OA0xzZg6BgjYfTvQtTBZ3IeKTSvPJ7ebTUWzLPVi0v2SmKhA8XYA6MuJOQSXAmqJrMAdkxLvfCWjuv/CsJUS3TBMcEEiXh" +
    "gVqnqOBQfs3RiE784DbzXPTMiqqTEAFRH8bsV6LJAGLkWfL1gZJn4PptuKbGTODUx3emeCDChc5AlfvYmMj0BjNMfrcKNnTxxuwuTq4ARipPuHZqNaeNhqJj" +
    "CubTDA7QI705B8yBrNOus7VUpgwwr2pM8HOmYe6zBCKZ9a6Xovzwn2tkNwOALTyX6HXnDBZaEHOSgaoZthgz1wbkNdXGxMU2dBD3Z9DXlvCsxc9HrPEdA76L" +
    "ewy63hZ1i3P23QnFTQar1lXu/nVP46LnB3cn5ojdfme/8GRSBmU8apB/FAvuyTXKffcr1SgZqy8G7vAuqcBTzKRLnehPVXf1IV8/tJedEDKOhP1dyE06gEXL" +
    "FEEgE8EnBXw720UcxJ0OSoscsoK+9+ebniCHidpwd0qGK5Wq4MScBz9XDNKUYC0wyctlUJZR29eqMzYpuzgTuaVZrEzS/nRcTUrnZf2fRQIomKrZcPDlmEtw" +
    "LYG2OfuGRPhwYIQNzWZERY43REeyDe+6Wlt/Gg9iAEH5e0DaeKIRaWN3xTz6AM7sgAgJa2jkiXelUIzJ/YEt6BK6ra1IQ9jPEG06BY9JxjOPZ/AD4am5T1s+" +
    "W2rBxDp2I34BbQZwexKBg5lgTxIZa5vn6/fX4sV85jYdeX8wgYsBD+lztsXFkkaz2dxDswEkDyvXASv1ug4YeR0mSw+5u1/+vB4zI6cofX15X2F+/ESbHXpl" +
    "jbU9j8jHiPO52ZH6VZ20nZ6M5zEXNAUKgAd91TqQh4ak/4h2BgzQsJSKIkTKh1OH087xY6dIzxNFOPzEF2TGHHuuVQeC+uOSQArAdvmpBsq5ZkYRms805FTE" +
    "HrG4+6xPsegNqntUAc9lld1QbmAAnKzVHMFmZEjOxbujuOs5V31qcRPNzCsTmMvDNtmDpJS5uYyAcgyOraKPPYVEzLYPu01duv8brGcw1KsprH0qEM71vBGT" +
    "EupUcCr//eV0AC9O+WEnkG1ZM2UmYc65ZZmpZL5Wp4IUnBMkpOuFCah13F4KPvbKB3jG2STL6zitejPc+knR2sA2NPlCkiHBlC5Z+OBDCantBmOWaM7c+El0" +
    "6OdWhckyomFTkNFC0tMQDoboPq7KkcVtto3I+/SMntocC4jeUENU1pbQ8Tl5rqIDbsphDaAKZVAIuClIzAh+3ITlRIN9+yVQgze7vhQMNMqJBXAOHRrxV3OO" +
    "TfL0W5Cuptf5H2C7X8rfdWyqhn+V4fPeJVui+NON9GgjHn29tVOv4c3oG4xqBFlQTihPq6cEcrldkR+qCfEfYDBlioDkx7Y6agpXtln2ywRfvVBngzH5B4sV" +
    "yq5Y59XgBudtBL+I4T9HoBdYehCj6zFQByARgjtecQwvGQDFZmA4Amxc8npPapwJkdzY6G0TKFS6lP2J6yedYFEvc3g3BX396xeThlrdJuR8f1fpfWFgaCZI" +
    "cJI1XYdVkGhqckRzJTqyxEmhd65UgngCAVYWO4KDnQaFkxyCME+qd6cvcjudIFVxT+7hSOwhlyp/ygFWhUMLo2OGiV3Ar6MMuLltCXsJyMaG3DTWKafRh5FG" +
    "HVqZJ0t5qYBeCgmsEHHwDv5Ir27Rw2DGXc5BrfIHRMqnzxk9ix0iJtN94+iFTpO8KCR/su60EJ+jJsp5+bjY6szuzy9JKAI0F1UgihYMFcShtS6qMeQbLrlA" +
    "dleLJHPQnYYi2d4Kf0Je4okLMEvXhK6bYmvM+uKoxu47tiwqrPxhI/vFCIKrh7ojWO4deuf2rqDrCiR8Y9erhFqqFXfk6fC3Z+IwqH6maLARXMqlGhQfK4Zo" +
    "nGoY+VzZGvo4jr7hRP+jS4l6UZFmi5Jx8HHpZUM5cSPV3nRhuQZzxAKIpX5EMHV004FiHJhUXR22QamFn4WnzEMxN5UgoFnHsRdRhTYFRXZZRIYg3dSNBlfN" +
    "gQ+nZqPXN4UZ4z124O0NQ1p0d1su0uYBsb0MIesitbzuxsAe5NmfmrxqVio7j2QWBd+WIRz30FXnyzMddlqW7Q5WyGkqiK6XnUt67XcqErMzrOKKsYkoRMm3" +
    "79nrJ/62qlKWc5sDFurlxHiOnRgEqyrUG8JNZerQ96BEaDiSX0Jc7e28kfsWdTtL9Sa7G77nzzKvlHgsZGHMYxP9/hgTAKSV4v+XiWjr0hT6yXlWG1rsPHh0" +
    "9uE6e0vyUwe08oZmwYUalTAkSWF7NMXu/VyTkrPrLu1KQsfkWZk4agVWQ5reHh2tCGl5RCbqB25PMhPnjr+DGek9v9hBYsZBaZePpvpFqAmuBvqC3c/kodAN" +
    "ir7w5WUh1ZD9dH2ULUi/IwcDNjJ/irsv/sN8Znij7BJi8hCW68pEtz15ZsL9ijU9emKa/gHEgImTIyeS1jAjUAQWOPAdgxY1I3oklXhIt2OCXZvZx7d0nEwl" +
    "lFVomVIX5xrUFZexwwEhNh/ggoHTmwNXr5DpVf229nwc96etUGXmKlZMReEJTcfAJjS6NZiJnpH6S6tQbLFjZIx2qYu5vOYg7UOM48H37G7r8E2XT0qVsr7U" +
    "XiDtx5djuX5P+A5Vs1XeXUJhun7PIEMCjMMhWfwz2CykBEDKQ8mMELHAc3gcoY7HiaSY5pHE76D1aE/OJipG0ah5VukWwUWa/aH4jbTtiAzkvSyZXEd3p7S6" +
    "4VA5QAZxarhbpARwB7r97LvcJeBGaXfi4sY2oyPd8VENAu6wHjO5bIQDBhgcz0tROp59z17gCpnCiS1S1NTn5tkyjKJu/qzzPZ90mIG/K4LNgPgFBtfn44NQ" +
    "7fWfX9lmYMNQg7mHGpnmkkt0N2jLYfitQkF4hQKd/LGyEyJ7tKSqaYNwrj9S+6+0Pyyggy4yM96eCUOw0Qx8M60gaW4NQIbwZMG5HSEJGn7P4Ed4iIUlAmkN" +
    "E4ew3onVaY9cdWQXxwdXU/TozIZlGrTAIzZAa2UOL0UGxdxrN7jv9TP/Z5HOdfFHpKgfmMpZsDq/mZHcfEQe5Te9c9pDYpSDbvWHk0KxzwGklcFm3GaqwmI+" +
    "y71ihjMxWE3UJhm+9ErVSpKM3Ci2LU5tDAAgMitWjn7mAuEf0imgwdxsT+acYQ3r2JA6ilt3Fv4E+tqjUuMtLwSlCYyyBkDLOyILq8W9bFPJnKid566dLvMA" +
    "6zGdDl2EQUdG48NFi+1m7Bp4U6reId7uVKXARcD7PDCtCR+no2RAmEkcje4tJ5y5y5k5eD5LWETa3+bo8pyHrkk8EsvqWV8l/UAxincaHFmn+3h35RmKE2Fk" +
    "RPPOvG7186LoZO0fflXyWpZGL4gBjS6ahV9qy8HFcYCsj3V8aPddAJowAmkG2GXsjHSAs9VMhE+Wu7U/bguHV4dtYHskG+EyCzGi2r5bsGhmrN5N0losap8B" +
    "Vlh1BgQZj1OmbRayCgSWPoBIZ66WilWdq00DJHGpMLdXyjrDIqZS3qSfvz1ki4jk62YhAjqhQXgBhSUVxNPaycUu88wJf+JmjvL0qJnGL8TBu0KCDJcMB1pP" +
    "h7RnGnunspuQCnv2VsDFTS5WUWLnL4ab9HszRq17tvUvKifpD5Rqfg1zqYvcWoruYKBgb+NPIFRRWiL5LAZUqKzS0WiNBt+zEnjp4zsykO7PExZ+RwQ1Ltkc" +
    "EyU4lNz0oy0g8zDSm6j7GM05zmz/x/fW89kuWTtbwlmm97vrLBAVsItMeEYMciSCcaMaFZTMKIRtYWsjmxLMN70y7vnB9M70H9klvlUhUoIbo4JMAzxbWe4y" +
    "2J3Ch8LgkkryCGz+u7+0+h623yWq2kO70rIptvIH85BRgMXQsCriMszPpu4T+m4zQt+/geI4l4r2l9qIcFzmKY5v/5Dugdang0kHhYAhDpY0Jd2zqlvMY10v" +
    "AClbI/BJznUpBoDxw2M+yyKm9gn3cPGIsf5A7qVGrZbrbE2iMZkV8BqdhS8EVwYs1PCuB//UfnWKTvuEEaTwEntsK7+T/kmzfyszAc9pXgEItgXD10qbKK3O" +
    "hGBNCS91gRkWONU/kAHdjs85DZJJ0XZVFML297Uq4BPUw2+qIkmv56I5WsLAzGE4kG4NLdMSElr3SvosZmkX62bVf6x5rlnd4P4oYZ89QW7dU1x0crLtgrsq" +
    "eB30qAzSN3Iiq6XYQ/TOcF8vXOxyXKLrjmpf7yzXZfW68TchJN36BzXM/67deYQhpmKOlzW7L+6nNKzC8JOgJMNsi3PG77QSXAv2lyOGyZJEq/l1vbsAaXpO" +
    "ENp5mN1DKHj0i3mTbF23EdaFq7lJ7k63O9p2+1yXG/Pt8/ftoyVkahm3Ywo1yxt0I+jfBcAAk3PcCnP4MHQq6GEXn16pku9GRjoYa4CofcnYesIYrfe8SWOw" +
    "F1wMr4JyKA8r02ojdJTuOhUwciw2BuZKJvCxgnEhcD0DilrEDXTq2yp974T5lX/dElBT1zxhZpUKJc2ofAEMpuhv8gRTJfjbmDhrWZ9xgMQ6kl/Q9BufcUdj" +
    "t60ESJ1fy2xEpNa1cwcUWcvuF6VzEEnLm/ooJOW90IeVTi9F/UaoNbGyPyzeQLEo7wBjyqZS2nX4yogA9XxiQeHS2nFtjcsLWcH43KupA/KgLea6wSMAekWA" +
    "IolGqQ0zahOPWc/NEbLjgXrs8oMul5U5k4930ibXwE21ctvbifS4M+JQ4iZhvEtjhTE7dlZuTwxaN6ICw4NM8tkxFs3wC/jDuW5ngVLvLTnyLFNtQlTzmswv" +
    "hYu6O8omiypTSj6nCwaF/Mvr91EgD2tpefGOBMSb/zgiD4L+mZBCerVXUCgktje3p3AsVoUoHHSUSIq8XbVXSYgjIm8SgU190VzgSAhTMtEm89F/xWHBNm1b" +
    "U32Ky9uo09PNNV/Pn+X7n82WPnIK3yL8EZ+uAT6et0td+ijshdqBjEsTJiI4yjafeq9+HfHZqcEeAq+GfJFWMwdXBXwDwdFOfy4j3eSevrftR51Z2YH5LsZk" +
    "Puns3qOkr+bR8quINZsCESe3i95W9elWvkLicwYsWZ+U3qlk7+ykqUIk3SREUtNtp428GepK7FQQuXwMEA1jGZiAaLcd++C5mnz2hQOEMu8clTxNsd+wlNqe" +
    "9hG2soZkTCDEVm7KO5KTILfQ5FCk7CPmlSlYTtYaZQMK4D9eYjvSQPLcv69s89vmgyRr2uOevQbKhPAWjbYYKkVCOSxldRfmwFiiSGq+bz1YVh99ID42pju4" +
    "N5O1ZAd+UbgZpeTPxQT4KaJY7Q1iQ7aX/bILhtYuOKpA3qWtb2fg0qOqXH8LIBKO1nVvEtR5Gui6PiWJmGFDTPGqqaBud6hwn3jeDo3TX6vsGsgBI8eB+0Oz" +
    "YRmeIYAyzbXuIv1DyiV2dKXc/s8d3MBaHhX2G7sUkEsgf+F7rBZ8GxsDhoygJ1ma8sbz/ecBWRHKuww/a/cZI68uisWCi5OUtCGus/ThgRjY0y6oQXVez1k1" +
    "LQ48xn1Z3mG6Kd8iRHTk2L/84vLHxAtmAqJNIMqfUR0hfJmU2c+nPlhuQEj1mLRo3xR3afmz+4duqFg8fv66bP6FiqMEnBJeE0i1R+c5bikD2S74lZqJaJhk" +
    "JwBHq3KKlmIKnyi0KosoOzoPY+l+H8mYbzj4CVCHEQDcBpfNv0WR8lxXlSiJe/i39YfDsX2Lb8EpL4lMcWsq00FfnwDcWFi4BKvSxLMKQclRi6o7KrXe+9uZ" +
    "hTh7uqO/Wd+z6PkMa6gDSdlt44wEfVzD8972yPQAOlScySI0dZtFN88YCJkshK1z015dpXlJpGjbxHLyw1WlnklfHHFIJZ9N6XAiYS2YphiRFveD8iLh0uOS" +
    "hmhMGvyjx1XxOFTp5cWNNazkaVkvY7RqZr9fvBrqhwydC600OQC31EsZu3UqgDd08AKU5stICeMam+mWO8r4ADqjILyC91O1d5d49nQFXc3zT+xFhIGwwItc" +
    "oAtQ7ER2Qf0KUcKc5tX2z5fsDCHI7JfKBqFHIJxGCgezu0hlhlKnDDTKzNlM159VFIw3+43cu+hx4l3cvlptuUI8Tw/7Uwy81/WeSKlQS1qDTL0hQIWEZqHU" +
    "WN5xYkl1cnv4Ih0Dh1FD0eoKrV7mNSTwIejTaoN7cQ1EufYJk9deEwme6GKx5UVFGXZfeEEjXzOZomF55m90w6JwQD6qmjlhPuuoSr4wW5lvuCMKO03yDm0h" +
    "H+E1v0YAAlaFDSy6+Tc9T/lORZO1hhr2zNtKURch2g3oY9jABYK+AAJbSRF9PAGqUrxylI7PorRTC0YEy/Q0pYMX0jaNusoKrbEE+DaaDHeDR509FVpt1vY5" +
    "LU4SQBBVAWpzxiTUa/k5Ty+eQQNCzPttLjQQnXHard6v037vRwfEG04bYK5tYZN5NS2OySFJgEJzkcACqXlVpZI2DPEqo3hDQ7IHazmrxQsC55qVOm0lL9zJ" +
    "E0JQkte9pdJfdhL/G2PsB6nsb4EAjb4VzKS1DCmR7c12ACOKN89mMSqVhwk7XdBCI7m9dDa7GrCXKijEA5QZbiXnvof5G6DaphpjePivJFPq1FuE9A6BZ2zs" +
    "PBeLJiAiz5RIYoWSA3ISwvg1R+F+ODM4BY9/4elTjyA58Ogqr1lYcKJnJA5eQezcFnZcumOaHF8sbPDgijH3wBC8v1Uky1hmkLqhMXzl3tya+R+ca4D1F5Un" +
    "rWLgPl4a/IQhbchEEUiuuGwu5ylfT4fq7PjEmI7tKumAs4vNLEel3uh7n8B1ULwI14OrrEmurrceLOT4VedhFTEHDaavgBQ8qa6j0x/TbHOqcKhBEFPo73H2" +
    "QuFk//m026n0A6t6nGCubhM8ZJ6rc6JL6J7cc6RxDCnya9jZvh5/tWz57SsVyBVDY4+HX3M+AhNDkHaDX0QG58Qp3n7JUVlq45+wjrS1sPOOy7dvVFmkVzR1" +
    "CLFQagIu7WiIAjczJF9bw9cbstFbhhveeePi9KjzM1i7/aXZojzJXKfQPmIVA5WwYVz/6LddZjl2toKgJnKMKyJ6Cxtq0HTUfQTP6CsqkNtV22DxEB13KgM5" +
    "HottnTsCLOZuK8u1FV+NCoe25mIajKgzY6tyfwDh8k+enqiFjZ4R6pDigEQSTKGn/viSrqDIYdey9CSvn8XW8sVUQGAyZhm9idAXRiC8ItQosjoJdU0ujXm+" +
    "yUyKxTVJmvsuU8GJ+veofum1Ib3GUDBGy8G+DpnNt5PJF/BlB5nzaFjPhT9CuWKPIlRWi4TyT9CY422oCAjidF0ZkBDQhvIxq1AnMcQ/2y5LRfcAagVtDKEW" +
    "UJa5x54Yxgs3c/piksgP4GQ+/7sAT3xF6g7qufdWtUKWpDwOs4v49jr9033Xmwk2zl0o3OVZ2rqK9ZxI735pa3p7W7zfdp+gERq6r5oVd+kHvYlvkPcMqZGE" +
    "dE5aiToVVWlGc6VjTFVbB2vEy+ym83H+sD7WFRmQBFExsbfjX9+6+9UKwUfLxPFm2DPP2F1y9FrwPULT2sOdEdZ40qT4mtQQ3Ggq2cpv//LVsR70D9WaxuYN" +
    "i+9F06hkbo1T/iOcXvV2aTSkcbgk4RUIGRwmm7n36BcTWcowvhkRhFobfNM5L5wclM7vpcsfcLaWVNv4VphHOqoremdIHAb2hU2EahUwjMhcP6hH2tbw3uz/" +
    "FmYCelJsoU0qmAZbMg21a0jQH6eoa28PNl38pqVMeqP9T6RJPnFmefwv5YBtsr3k+2s5fhvVRdReJJvEKTZ5KFpOeralQ8bCoh9Ybm06Hp4xWpnsHywJ+fX2" +
    "U9nzrW7iGjGZL7VMRCa5Nsr4llA7ZC1KUuKKkk2MIzXP5qXZ7Ra33IIwWG4qE55qqs5tJm30MVBc+GrqaUpq353SH0Vd7lmyApf8oS6QDlEwhEV33o4D/nbe" +
    "UDQee0PwIIQ+qGFSEz+DiyBx1PTytpzhG3W/Pnq3b+pqaOp+32qbSEPczRTFKuI8zwhkuAMe+o8siQ9eZ/+5APvpsfCMDqDoFctS39hxsQg0NYnRA60tQNO7" +
    "cLWTpnpt9IsUO4R5FMgC/BIyYEG5GguGcLBQ4fs6h2BvSgIKwCxoRixis+AnR3/l3aH9SV0ScjCQuIloODKoqgHe58KcZGIbACHGNXzSpxXV/d7Xrb+t8pRE" +
    "BH5AC1bdPqpuVRPt0B5dFQQwYeM74BIaZZ0W/nY2O3zsskrQLaJcln1p7TnofEBu7NuKCm9Tyfey1sxvaBgd8EwY/ErghQ56Ue3f0lpucSB5wHyB63ZigtGm" +
    "u7NqoDwY6V0tL8gfsePT0OvTSel/s+gLV60T60XMKY9UwAGmj4ZdIuvdYv8lgH5qY41BSw23jiKZ3FXv9ILOcPNYz0NlLwK8Vs5qHQyoD6GNdm4YD/3YvMh1" +
    "zQD2DrIcl+7TH90a1wqmtAI90E8NV/8n1BtclAn7Uxev1O1JgRS/2NIZ7SOvDf++Rk7WGwkbbegsTSnd5dZypQ/hsrG6mCzqOhqlZ4wPnvogndDiE+a0B2ON" +
    "2LZ1Ko7/krCQxioNqNqAEN80aPwq3Y2JUv1LBxM+Csf2b7KjkAkpO/t3zH2HyrXB8AR8HMx9rEHBz9Rro7L+xKA6pOq5E316ZRgMVqjtR8HvjtTh6dGow7R+" +
    "tGA7Yfwig0yZPFAteko/GNxKL8iu5CAup9zW5sm1B05zTy/kpJZ8OT81pOGKfryP5X47oj5x6PElL2spoJ5NqlUjtDQpZO8q92wskTu3EkD+wdMl4c/FSnMz" +
    "tmIplBiiazvxjWl8wvwCzt3uwqDTvLqnO2GjhaAfCwmOfPjifaXpKjLsG86h3GHYDskBvPelgmlYKiYDqC1F11flHxetLytzjy/RmqUGE4TgcfYWrntCMowZ" +
    "mEEbZLhr/+wRI7Z4i41eK1Bd3YyQshFzfHpouvkWzZnur991Oop+SF8DMenDZYSgQ4AB0shPTHk6zKGyoJBYEayveWtdPCyYNp2yySobUzU3uFeQx+HreIcC" +
    "FzH+xqL73hL0Q2e3fM/dlu8OPWM4PwZHMpk1O5L0O/U7UsQTC5FPvrwADbh+UytxDt9mkP2Nh6+cvxeahgiatP0Hc+fHAOp0v4HAPNYck13BR1VDbZktCkIz" +
    "kBOVJ52QY8ph0m5z0v2ViofSVaNzeIFMRRHo/rEf8PEzCd32zuEdT+bt2fVkajApPWxu6zZHNA/RPt2U3wjt/0f5cFhMARn+O3E9UJimfuFF3CaTJQPDX7sI" +
    "6nvHfm8Xmp7Hs/rApd0vL++9dTE4kUviXJNQS7tgv6mXo4/Msfs+NOLeDURxmXaaxM+xpS7HKOaMt9HCYOLj6L/DL1jpczQirCIEStqtHPjOVgrHQuvtdzIo" +
    "HTGveOxyZepJy7PYm4+9PETl0OhulzRW2GlglqCVp27ojMt4RJsBZJ47c9eG8oU/te37bMj5LtuoJ1ZHe2aitKJW6ojvUVs/cfQJOvzA8K27RVpFo8Cv3X/k" +
    "IeWvANyma+mY+FtC2xQWED+BWZtT4C2iiATUSK0XkyqsY+a22E3s3bxlgpJX7jIGiQfHVL1Ycn/yj8Roc5PDlhEKYmc4g+SE0hZsoCtHCX2OCVXEXHnFV7F7" +
    "YFvIBnUOyKGz1GVGaKwsUh7csWcYt3v/8EWgeHsK98ZaAH7nh3Q0X2XJq0wQ8yqqL/FeSBkIVP6i3gO7LoFmKcLLuWFFM4NgObadywh3y2vbkok/hQe1WiGG" +
    "9YVIYvDtwk8dbz1UDDy60YdeLaSwp0JOBJlonbKF8Zp6QexWpFfn1zGJf2taoEQ2mBCvFzWFnq3+axjI3v4CMxJe/Y1I17nVrJT+7xaAyZlgru9ItYqYhvY5" +
    "a3gEvDOGb4i+wywc5ye4AeElHuxgD+mR/XWGA5i2nGGANaOT2QvjjmV9KLH0x+uucPRJ933cn+c7kbrGrVesnDx+ErGalclFPn8Gj5mok9Y+6Orlf4oNXBpB" +
    "hgkQEb36TuqwOR/xd44N1zvnIVM6QymD6iAhXsOhyZgQ08SOya+1cbmwG6vfRLEmTo2/56h7ifXgC8SKNHnbtINtLBNRw4L0ccNcnT7FtdTuOVIfIY1xVx+k" +
    "L6fEudAV1GWe5rhcwfnC1MzVXpmf5P/A6y9glKbRxvbIm44pJHcHGe2Y76JPBHFZUfko6LO5Z6ecsV4eF3d9uStC3hTCknxRJ7Hcxkv12aEoy8jAcUY+VSIt" +
    "JDGTzMQ8KkFOf4z1yffODiXsKz+LtHxhzynA3SCDWNN4jPWdDEwVMA0W6iEFPS719cJsubqJ+FpkyKlqHosK7aLKDR2Ds5mV0Tr/QTynmKKxPEZWIV3PxLtc" +
    "ULeOz9MrG/vOEMk40pyXr1joeJwLthlkoAZuHgOEtxwEAhdIjOc9x7pheH4+NkGYrRMvkpfftbbyyTNEPaTTtrx2tTiHmQzqvh134di1AtJbIXkJePdIE864" +
    "onRonxj3XrC3u+Lb8C1hRTqeLW9XwRDRDFFxIzOVH1M0wJu/5Tt2mB8yuHehWYcFZ4wyPkoyKZfastH37uJBkEVJDBchCrg3ZunMv1hrVgLWRZ2NTnBI+kvx" +
    "ZtY0bsWYOCdB8npe4dAquVLF+TjYPrnkzmfkD3v3wd/8ywPmNxGMPV5iW3kB/mZJsDWmU9B9Yeono2ToJotuycHVg/huC/RZeivBmHfiiNdEEULxf4s1hIHM" +
    "XnBuktIeylky3D+M9nHDQye2MdFt/jqOZ3vC5b5xyalEILSc682E7p+x3r2J9XLTnOfcjq/cJZHDKsNxlW0st7DbKcBWjTOVAH3rEQ4keLiYgf6i3IDYAp8r" +
    "rBERsUWCS8XBdlKxfzkgmXVRoI5DFbPQn7wLxX/E1RQTQo4HOVTyi3dnv1zm0shcXkI5xLPi97gnWl2YyUsoe9dndd4xQ13IOpWhafMrbVdgRCI8V4rSzLws" +
    "WD0xvWDHbpxBv8Oc+PmFqyr2wy07J2+E+gYoqxPs9RXEloLWbPyNt9OXSYb5onX31il/Vx78CFecMh5Bxda0oCiy+afDwhayYu8kzGYaAxeQJ0Qij4b5z5Rj" +
    "tVkyzZQuW5RIChHPJ1N6pjM4JPtsQPVwzZlG5OBrBvg3Wnv/2pIZ9xhMPnLGE2X99Kk8iMPoPTTupkztS8iEOhc6NMNAozsxHGA77vFE9snHMqIIFESVedpY" +
    "QecHEbEfrXdxcw3UAGDZeWblK3vO0gJPv6fC2Vf0SsuLCZix99ZPXDzo2skhEIu5UoLAdpJ7pX8F5ZNtM9CkGxkCKkJ+GzkBDKfRxLCQ/wWfvtycpEMo143L" +
    "acWQp/XQBj7bLQWf0NSXIGOm93e2sXusr7Xr3fPrV6FLdxHSmS9SBpKbdYrKlJ/IsA/zqbirlCE84oW683WVPcRLjdHBa757CHEyyyCjiGg4ZD7jcAVK58d+" +
    "jtZXeYvfKgUyQWKzWCetZvxAA0lxGm+Z6OAm8YFNCfRPvpKibYBW81vSDWqrArM4I/n5L0mA5ukKDdgZuNuV8lDQzE20ZUcN+m2SLmJxjYoc/4KyCWbtaPQ8" +
    "Effd7lfAX4URotxmq4xxSNAmkm2M1RLEOc6JIK7gX3pP19I9PtqvE+J0AJUW4JuCfdMCuMwjrLPvb1GO9UE5Op0hMl746ESgWlgJwtpODKfwNGv2wYDbDdqB" +
    "FpLNRYo7t7nZCQ1l2gvFdh2FjWby58xx+MRQ8Y0fqV5AfvolMIRCoQGP8PSJI/SMCkpMjT05r0ZAtXXt1YS/2hiEcj7KDlbEdQR04f8yuhnL/CN1go7iIwlR" +
    "h+HEfFdblBcT6VZPVjQnEr+IitHA9Vx0MWIj5F+6Kygyr2khSOtf2dj3I6vtxZK7KcIGifyP7ft8tdUbBMKIJFDJiG4pbBYVKNyP7YizKOpVb5wjOAdWlIJ1" +
    "hMT27tb1WapRKUgPwqS3nGxPzndYS0c+J77pk+zQ3k6NiWslEQhkfceGhGM3pF2H99JJx4EVta0OsVI/lyfYLrtlidQ/RFq/Vscs1spQ4Ju3cK/SqUU5NHgH" +
    "F3rAEuay1qbUZM7c4OBFYQKKJ2LZfmQSAr3DXemg7GcXtQ3ovzCNx0ocm/H5cp5ZnXExDElMV+49PvTcbMtyFvn6+Qd6cwvPONAI3iJkY3HQpZZyywGZzP5w" +
    "AA2ekt8KR/E9TKzbSQRVrBX6TA9NUfR1mIJ4BajG1EEf8qunLQfCQr53nfmyeiBls76OX9GVwDHxc7p2iIDkcMCv8B+dnXDuk6wnGnCe1+zAJrcsBazL2H8u" +
    "3Dy8J1G7U8PoT1pNdYIeh55MSScegCRxvHxhPxuGprs7L11f7QDrKPdqTVLkputgsUQIucep+fyihpwkGaFp/AIDXBViScDE3slYitv4K4kULo1keWQCjjCu" +
    "H7xduazLKe7tu0ctnoqdWvrukdzt5Rds0q/1Mgtn+rIrjDETej1s2t268Hx12OpcOC98+91yZsYOxtqol0vlwQXSoMDuZDP4Pwp3fQ1tq05hlv0jJWvyxI85" +
    "SbYrTgWAqu13lvOVd+ISd5GjFwmOOGDxrwEsyuHh/1rcMNg7wp6qVgvc8YuR4ZFmdBfGGBD25Xj8KUruE4QM19JYnK7ivvg1ZGeDGzw8y/3wcX+hg/yR5/ox" +
    "tno7ishUcMd6kpFVc65g2RN1FnLsIt1yiqyhEHbQyC4QmXZRQhBxzT3p47lqJFwYMZ7F1Ry+xPfuWHFHMhuPXI90R8u5HY/vNlW1+QAgCkfRWK4mnKobJ8g0" +
    "7YBdP/TDLF5oslzqhsQjumsGnA7AFLj75Gy04sNLzsvxvz+6plCvhDy+NN5aTEUFPdAmY9J0mB+GB0XR17TncfiyZ8TBvte8tIorQOlrzQBtgMKaDo/SqNB1" +
    "ECatNptOX4Fp/B0+hV7gcLKsJAstzz/Ov1GpFwJTRfgRv9wfXo6U07BxCuxxQybmf0uUY3kLZTyaclkN3BVPe6lxxMfVp8A02JWydNkfy5v7ADBhC8ftb80n" +
    "wpxygZfSKaHxcbVPOTVIbt2B5vymRMR7ElNbjeHWx5EX/UF7xPmpoHv91TL3aL+FPPU7crnMlWEZTOsixmZuZ+ttbP3tC4ckdBB3s41aWNC5yvfM9WkidB3F" +
    "WlT3t8AnswMDAC+ekwUWWqA12D6c+Pumz/s5UkhNJLts2byLmWAIOJC5Ma3TRjgZRlil077T/zi9j+/wnFzBj2Z9m61GFr5Ewt1YGBfvbOo9YoSFsFnOVJ34" +
    "3N+PyYMF1EeOLwOJq4RlOvaUzaQl5ujy6D8vm89mVNFExRjCtS08HuVsrqKbzosKE/a1/sBjjd8MKDzolZ402rRf6b/TSXO9zDpbbFYuxZgPo5iomH1gVzph" +
    "RqYyLh59PAEHO1zEtbCNZhc5uXSfQVwU5P05yUL0dbCK9MKh5hFxyZcJJqXPnab/Wzg3ssqJDE8N8IqrUjMO/FMm75ekLcHyTWDwISGqBdoxgf1Y03RMKhEv" +
    "l57b05cFok7dwx3VzoAO8LouS4aPzpcj9tOf0HpLzjuYXfrKoplNr8iWsys7RUJnSMYviSf6skSgOWwf84G3pmQQJgvPhrpp5NO3F1FK+NQgRrcVC7HYqFs2" +
    "hWFIs+O+ss0JhrqLt5f/IGdW8FzF1hLqLa2yM9lw3gSXYS/13XJQDW1JcbLX0FDM9IDJ1zzQuVegzdU74axknHkT6gn0ZyHz+mkvVAIrFxiArsuFCSiw9/6X" +
    "LX3pcjzSGBc6b2uX5IxuE7zPUMClpOqnIymTBT8lqVTeh2+v8YtfjkKlXBQByE45i6WCV9R03O5c2QP8PzI52UOCn/zfla0qcSmWk7Plor8yaT4AlUOg2fWm" +
    "l4Glp/I8tVJy+S+NBJCW2fU1LC7i1c5xNbobcjU93ttCkMVjNtnZXEn9WTCnQltYkeTu7ILVovEhvh90N8SYE+UkSUzFxSrOzUA3r50FEFL0e3Iez/SpqaZI" +
    "B1Aq5Dt/HOHEhZk8mr7yfBRsAyj0Gz38d/Xwkqv9+OVqCLSf0pS2gEnzuyynxxrBu+HeA838kuBh0QJcdl/UxuI8guxosFcepg+BRnYvL6I3IwRoSTfl8AAA" +
    "UfwJXwqBF68Q6qZyCML+elI0jLN5jIjc2ArPBr0cBBpl9h83XvPfV6UcNGaaoQBzQDJbFHCG+ZTze8AK9i8JKTnP5ULAyDBiAK9tj45EXp56+Qd6ZZlTbSCp" +
    "uLfv8OqvWnAgHPT36RPjE1roGpFkUQoRE65sARuEsJPpfHZgdtwIACCQ7aRVGWGXCkDWKmhXjZYndxrKfgYnf37uzvKWI0OwVyh308YxAyPEzx4g1l6LJ0dT" +
    "Qc6M+zRGqlY8cWg5aB5Rc7gA510sGzzmKKss3/AYAAK2i6AdO+UIT/3LAnfrKEo5bRnAmS9Kwlried6y4IgD0kXDQSv8z7qpVx9gFVoYKHojt/yQ64Fn18l2" +
    "t9Fa29cu4jBQvdQCv1tfBSfAYG+wAAAA4e+i4Ks0JQml09TXUdqi0sjt71BBblv/0psgv+hf9ax0kzJRKoJS1v7DJO/v9VjVEUwKHzoEN1AK0jJm4khmg2LL" +
    "kQEjeUR3K3ue44tYI1TdYgad3q/KHO8QY/erkpuBIdq8f0Z+wQbmcZmZrEoFpoSV51TOFQoHiSD6LvlElmcyK//VO9AiUETbWm56+vIDKDSBRDhv7XGvtjDC" +
    "iqvvc03ZGQb31gB8pLKUrPi1uz3A/sP3hCaGcgAFIs1m0ahMe640wp6VfgIeMF/zFRgZwCFQBKsUNhrkCU4XKb5VkyaRX1ClUEy/X3iF3bmq5ez9ta22aeoW" +
    "QVNJcTnzjJ48e+mwHWxCFNAzhZhnmnEhKJryAAKsDiRwAjJkzpX3lfcwD1wAAAGfMn2SEsNgU4M2aYHf7WWoxsnc6Gg45BvAw32v3I7durm5jPFSQfzAL1UG" +
    "v3YN1FLhirJhFxaqQoySXZVq2Pj6dyD3usns+7NMugd58GUq+pSr0o5GxE0kNVKMsJK+C90DVRFxjeQH+6uAOUHgKlJ3LAAYsIls3z8KQhCf4FlgD6W8+2rb" +
    "jJreV3cQFGwaBtVRK3F6Qy7etOsD19GIjKFMiBRP4craSrTLode9UpqpifoA0hsgB87Rwc5DiYXELWUxABrDbE3wd4fpeUbhkR/kx9GNCmXtyj10AAEb7hDW" +
    "hLyrAQABAI1wbiEAAOErysAAe9J/hJV01E+3V9BjO/6voTCHYcVw01zLLrY8U4HVYhrAJ9SkAYTwBFpifTjtjjiIOg2pfHNoilRAvJmOLnXyEJgz23Xs88jj" +
    "PAysqnckQWTnf7sIBbSl1sQInQEpF6+QkFOzpIAAL7zDCCvYC75VsArkkPXV+BQus8AAAAAnpmDezsP/5iV01L63gAP7wGxdSRMfHNARSLeMHFcoHc5AR7vE" +
    "QdJY77QiFWrFEbHfHYrEs9emeLG8EAB184mjAxKu7NwF99o1EuvZcS2fGioP5kbVCus9+dYMxW4YzGK3uNRLarLDanlteB2pXgB3tUYXOcYnmAGM2/oQ/c6k" +
    "H8Twowr8EAcSrmGL9fKH+nCFgIMgADgS5gAg56a9VAAiHFgj2AAX+hQ0N2do7YPc5zomXwAFFVEiDSALwgBRkFCaWXVEssTN2RByEiuIETQzqkAPyxXVIN3a" +
    "Ad5E6Zmlf2qt0ScBoZ8pU3XneNNU+/Gd7dDf59keBrTxsjxBQBTvCgAY3AAAAC4ItJQCByAzTpghb1OiMARMjGgivoT0kAAJwoCrkAAU1lMBgPJarnulbW9Z" +
    "pu1tMviHxmQAZIB1uEH6K882UIQSPFeCAAC8i/4O6eM1ayNf4zF8guiNRrZNc8xUZPTstrmb1/1K20a3urXJuGApOF5k+TWVb/CPUysv3kQbZS455X5CSgv2" +
    "cUmnuVj7BYIfIIpV5GJsF5kn8CWGmZECVfjwBJAUDDyOc2AACyuDANq/QAQz/B0ibmmV/BNhTqtmBzifQ40Bs0mpn1EHtoBZfiTeU8HCqAdPdcDy6WCGpb/T" +
    "51QVAhHbwffOK3ttS910B0IXdf6DdznT1ympxDvFsic5K//ALhHe6RkJpQ3u7qXjkNzIj+T9eHOuLksP3j6u3MBGbK+SN0BEXZh6Ra5ZW6aaAvhR6DLyRY39" +
    "AoN02ibjUG/IReS/Fi6iSFBEIZfj9Caz5z7SV0ZhjiewHpuju+mWOj0z5BmQzN7mwMedWgnJxyxsZbpFHfSOolB20vH4w7Inb9tPLIuSjTvTYT/mJ5pRM/Lu" +
    "pgoNGtUP3w1JAwfyX4Ba/UIeChyx33L9NbB7cmCvetVdIqnhsw4VJZZpOpFFHYwt7FLpUn4iGFDPhI3HBZYsZvX+/XxoqZ8G9qgFJTjZPgDFWTpAOFUwyi7u" +
    "mMciesvf3jLg9gU0NGdtRwSVMrKJ5YlTj9SCRQciDoXVQ169vkzI8IFR66W+0Iuic0Eg5eGyj1YlYzmvfoTW3LBdFfIstX2ufSK2vUDyoRqx46Pjyy0s/4mY" +
    "t9JnVNAXArgAqFYlZEKdMMNi0w+El3Og0Sz0BtVw9oH1fGrFMuagJe8vf83IgqXpSK//LVVvrav8WtCpha47a7wooi94O290cj/9oSVLYxDK5nOd9tUJQ4Qf" +
    "gBX066e0ARB2R/pnIwguJZy2gin3qcAMwlH3yCwjFfQc06K5YuqN6Zl9rnBLDGoDv+JMI2ZPIt0gFdeIHMnOy4FANOOrQ1fl9M6sSWFTJ9GIo66/oi0NfCA3" +
    "4mVIVKQbYC5n+zBOJecqjHujy2Vp4LxcrTAhu0IPC3J56QiARXfm/03uNhJWO/hVGuzuMq7sVGMtCXW3hWW7oe0PnZoXD1KQO3MNCinswtl5lr4ge8w88kLn" +
    "vVsh86zewE/tPKsXOiYyqwVQICGpQGa0hpqOWl4TemHyHZ4QC05Cd/l7j15Y+UOk0D/kQgAUdUdyhZqhm7JgD3RyzXq4fsbTBw7QPjKykUidCXm/ptsU7p3D" +
    "qsHj37p2l92a79vnVkSJVPfCabeOZB0E63+b+gdBFoqWxCOOJCfEL8Fk8GsQdGE4Dzf7NaSgBMLuvr+A2lQ1QMagQ3QqzujWlm8qkkb7vCs1lFsXUH92t62x" +
    "7T1l2l8p6a/XMRWjbI4MoAnyaFnsMxhn1BziTnpH1QfeMOWa7WihtbpFuKMBnoe2iahvD5JlUanif0LWz+BZWLdnM+6bfKE6UkpEdGlHgI6H3DdyUjwfJaq7" +
    "JZu5y/x9COZBDDXEf1weMAKRAXfHv30ky942tH1gR41wWzI2UrXQODZxGZki3t76Ra/JChGysS0vm6dIcLY6RowT20E8l1bY9J/OnsBg8I4svED0H9iuKu7e" +
    "ciIsOEoK+iAAADVZbAHIe/oeymhs1pXwXcht9i56D+j8yiSPjUOWlOJb7QFfwWaXJfXyUGtmW84RBnkGx4r1Y1wk6pdDc8EoCmD7yOphnORPecJhLgHgatRE" +
    "8nO9UvIB2kncrbFuyfpLziYfpQhYOdgGRWalEh/KBz4C50RGNwentOzzqC3j47n1GvvzWtt9xBX/baNSbG+SOcwZC2K/1o8ytLX/ZlCAWYTzs/E6zbCDf+Sq" +
    "0tkhnDqADF2IsuHiCqsDxJuhFAOYnJxgt8YsAKZK3wxj1XZWLb4FvK0ABfHaF2g3g14K1ZZJ2BWh6ovcfLOI7tcUCNbdxCVWgqgKBprjUCwRn9UqLW+aZD+8" +
    "ukhqY2g5b80OqhBJg2AX8CvpZs885Mud2lbG5AaJws0FAO9AACaHYw8AGXqfjRuwzm4+bhT/rOhafkFkF5YwWytcbhHM5ZbsaWLpjziVxqBoY6zLiH6bo//7" +
    "tBVZ3+3qqS3KlCtCOq9fDlKnLUt+PEFgCNq0HGLuax52AkrsPs1C0xVUxVHzbRQWyVjY35XFT04hCmT+TFFbbJJ4tysGzZ2cwakVrRds09T2cnH72iRi17HY" +
    "ZHhEtwdnbbXd6uuOf5h8ndv2fjSw3ImQyW7TY7Ep8XEBzpSxdvBQg7Cee6X+ln5DIy4hkysi3eRrL/VDM6X+MNrb1s6f5pl9g6EQj5p8EsrQC+oLCVzUWAlX" +
    "qAm/FtktlvUw3uRkI6aNhdLFXFaUStc6424jSacHA3f1HR2GtuizXIpAAAAWbYwH4AB2VgS4xeZUAEC3SNiDUFJkoHu2dqz4RocEB1f1qYoP/zDTedJ1qRho" +
    "QgBBQACXnPZFAAPFcuUS8bKdRwRGVCcJdDgA1kk7C6x3e2MTYNVzpG3QMCb2b4pBVM5Vk+3g/NcZbFu59TuW4Sk7cDbyoRkEQD7/3PTsJZOYoB4LJzIKjgZO" +
    "b6vUG3VbQm2oArIDYjijn39+L/joA5Csh0CLpShi4nm2ydqbr0AN3X92MdS5LqG+L3/x9EqEbnydUG2P4Xlj3xSYS+QRsj/8iYVBtTvdZpjaWE+JWQt0KZKT" +
    "hLHixKlR3y+CzwYCZx4dHCPQWQV+fFuiD9Pgs8UamgGZ+m+vYnLQtEWhh4iO5Qa5DHaFsTB9GK85i1FKVbO/+jQLhi3LdmbX+XEX0cIlWfqeuX1uZ0sA0pEZ" +
    "82x/kfCewtPtQYXiJJuXDaOrmauHiEeCg+qpf9VRkjf9GwqsWH9wQC8Mv78uwwwTI9HvaGSr/ehgAAA1MZYPD5y2RoePdxygcizy+xICs08ajk8Mg+x8SN7Z" +
    "T+PZ4EsEid7ltpZ6c3CxDI6bZRBpVQZ2Qi/XxbuEaEnjoILMdja9/0rddJEZIbZaICWRxlGZVoHX3FBIoZ4UaIr4Ndubxve/trgWnxBrCOVt4UA3PP5TDzY9" +
    "MgnKoaieJtoYcpGLHwQC8QFXSYGifcwzRu/Mj6ZNZFObUMUr2vNRtpnbTYJV57ba+9N+cpXQWd2ga2X6Ar3Pk6Ab2ruw0rsvqbaWPM1ILmRmpPahTBMWihqN" +
    "RAPoAMJmms/q2fiLGMmtzXgsuVeN7rxP2ZbKNcClzeBjCVY/dor3XzsGRcippDKOsAfJsUs28T6itW16wTNhVU3YsW9qKS7RVtBPW2kgJRJWU8UDeT2vgXVL" +
    "NmhsW4FdhaTGhOWLxCDPR3u9XNwOG26zfSqlIA/+ra5Uk3sqC1BeS/KradGhYW9Cl1oclpFE6wbXBnDtn+fgVYAoGE4pgim4H8egDBXP6zlG4p4BhFu1HeJX" +
    "gfwsdZiOwjHoPPfR7/G6BDtHZZStNIvhUXbSDc0e1Y1e5fvxurKdmKzctdvJHd/YpbALPNCf7+rw9C/WYmLEO2YjsrqFfohL4Hgb4olZqk90IP65y6hYJhfL" +
    "/aokpJ4PQBmgH2hGtEFvysrtTwLNf54/pRWF6zzTdLCzKf+xvcsJuF7DXFpnFnzuH7XXNRUGzAgqErvnUypSGOjhvbNaSyvfblO5iKX4/aWXWq4+GQCY7Ebf" +
    "mm0F5N8Dk5xJTaQjxwO7wDg5OvlAU2KN7Em/L6kT66o/XiaKOKzYTdrT576Z2sIFZOG7iZOGGAx5Gxcm43DgyoJ5MkS/wF8lH/pp25amKiRfyrIfZgQxWftQ" +
    "7NYAAA==";

if (worldMapEl) {
    worldMapEl.src = worldMapImageData;
}
const translations = {
    ko: {
        title: "세계 타임 키퍼",
        subtitle: "현재 시각을 한눈에",
        mapTitle: "세계 주요 도시",
        mapHint: "도시를 클릭하면 해당 시간대를 볼 수 있습니다.",
        languageToggle: "English",
        mapAlt: "세계 지도",
        meridiem: { AM: "오전", PM: "오후" },
        day: "낮",
        night: "밤",
        timezoneLabel: (city, offset) => `${city} (${offset})`,
    },
    en: {
        title: "Global Time Keeper",
        subtitle: "Everything in one glance",
        mapTitle: "World Cities",
        mapHint: "Click a city to switch the timezone.",
        languageToggle: "한국어",
        mapAlt: "High resolution world map",
        meridiem: { AM: "AM", PM: "PM" },
        day: "Day",
        night: "Night",
        timezoneLabel: (city, offset) => `${city} (${offset})`,
    },
};

const cityDictionary = {
    "los-angeles": { ko: "로스앤젤레스", en: "Los Angeles" },
    "new-york": { ko: "뉴욕", en: "New York" },
    london: { ko: "런던", en: "London" },
    dubai: { ko: "두바이", en: "Dubai" },
    seoul: { ko: "서울", en: "Seoul" },
    tokyo: { ko: "도쿄", en: "Tokyo" },
    sydney: { ko: "시드니", en: "Sydney" },
    "sao-paulo": { ko: "상파울루", en: "Sao Paulo" },
};

let language = "ko";
let selectedCityKey = "seoul";
let currentTimezone = "Asia/Seoul";

const previousTime = {
    minute: null,
    second: null,
};

const timeFormatterCache = new Map();
const offsetFormatterCache = new Map();
const hourFormatterCache = new Map();
const dateFormatterCache = new Map();

function getTimeFormatter(timezone) {
    if (!timeFormatterCache.has(timezone)) {
        timeFormatterCache.set(
            timezone,
            new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
                fractionalSecondDigits: 3,
                timeZone: timezone,
            }),
        );
    }
    return timeFormatterCache.get(timezone);
}

function getOffsetFormatter(timezone) {
    if (!offsetFormatterCache.has(timezone)) {
        offsetFormatterCache.set(
            timezone,
            new Intl.DateTimeFormat("en-US", {
                timeZone: timezone,
                timeZoneName: "shortOffset",
                hour: "2-digit",
                minute: "2-digit",
            }),
        );
    }
    return offsetFormatterCache.get(timezone);
}

function getHourFormatter(timezone) {
    if (!hourFormatterCache.has(timezone)) {
        hourFormatterCache.set(
            timezone,
            new Intl.DateTimeFormat("en-US", {
                timeZone: timezone,
                hour: "2-digit",
                hour12: false,
            }),
        );
    }
    return hourFormatterCache.get(timezone);
}

function getDateFormatter(locale, timezone) {
    const cacheKey = `${locale}-${timezone}`;
    if (!dateFormatterCache.has(cacheKey)) {
        dateFormatterCache.set(
            cacheKey,
            new Intl.DateTimeFormat(locale, {
                timeZone: timezone,
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        );
    }
    return dateFormatterCache.get(cacheKey);
}

function clearDateFormatterCache() {
    dateFormatterCache.clear();
}

function pad(value, length = 2) {
    return value.toString().padStart(length, "0");
}

function triggerImpact(element) {
    element.classList.remove("impact");
    // Force a reflow so the animation can restart.
    void element.offsetWidth;
    element.classList.add("impact");
}

function setText(target, value) {
    if (target.textContent !== value) {
        target.textContent = value;
    }
}

function updateLanguageTexts() {
    const strings = translations[language];
    titleEl.textContent = strings.title;
    subtitleEl.textContent = strings.subtitle;
    mapTitleEl.textContent = strings.mapTitle;
    mapHintEl.textContent = strings.mapHint;
    languageToggle.textContent = strings.languageToggle;
    document.documentElement.lang = language === "ko" ? "ko" : "en";
    if (worldMapEl) {
        worldMapEl.setAttribute("alt", strings.mapAlt);
        worldMapEl.setAttribute("aria-label", strings.mapAlt);
    }
}

function updateCityStates(baseDate) {
    const strings = translations[language];

    cityElements.forEach((city) => {
        const { timezone, cityKey } = city.dataset;
        const hourString = getHourFormatter(timezone).format(baseDate);
        const hourValue = Number.parseInt(hourString, 10);
        const isDay = hourValue >= 6 && hourValue < 18;
        const periodKey = isDay ? "day" : "night";
        const cityNames = cityDictionary[cityKey] ?? { ko: cityKey, en: cityKey };

        city.classList.toggle("is-day", isDay);
        city.classList.toggle("is-night", !isDay);

        const nameEl = city.querySelector(".city-name");
        if (nameEl) {
            nameEl.textContent = cityNames[language] ?? cityKey;
        }

        const periodEl = city.querySelector(".city-period");
        if (periodEl) {
            periodEl.textContent = strings[periodKey];
        }

        const ariaLabel = `${cityNames[language] ?? cityKey} - ${strings[periodKey]}`;
        city.setAttribute("aria-label", ariaLabel);
    });
}

function updateActiveCity() {
    cityElements.forEach((city) => {
        const isActive = city.dataset.cityKey === selectedCityKey;
        city.classList.toggle("is-active", isActive);
        city.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
}

function updateClock() {
    const baseDate = new Date();
    const strings = translations[language];
    const timeParts = getTimeFormatter(currentTimezone).formatToParts(baseDate);

    const getPart = (type) => timeParts.find((part) => part.type === type)?.value ?? "";

    const hour = pad(getPart("hour"));
    const minute = pad(getPart("minute"));
    const second = pad(getPart("second"));
    const fractional = getPart("fractionalSecond");
    const milliseconds = fractional ? fractional.padEnd(3, "0").slice(0, 3) : pad(baseDate.getMilliseconds(), 3);
    const dayPeriod = (getPart("dayPeriod") || "AM").toUpperCase();

    if (minute !== previousTime.minute) {
        triggerImpact(minutesEl);
        previousTime.minute = minute;
    }

    if (second !== previousTime.second) {
        triggerImpact(secondsEl);
        previousTime.second = second;
    }

    setText(hoursEl, hour);
    setText(minutesEl, minute);
    setText(secondsEl, second);
    setText(millisecondsEl, milliseconds);
    setText(meridiemEl, strings.meridiem[dayPeriod] ?? dayPeriod);

    const locale = language === "ko" ? "ko-KR" : "en-US";
    const dateFormatter = getDateFormatter(locale, currentTimezone);
    setText(dateEl, dateFormatter.format(baseDate));

    const offsetParts = getOffsetFormatter(currentTimezone).formatToParts(baseDate);
    const offset = offsetParts.find((part) => part.type === "timeZoneName")?.value ?? "";
    const cityNames = cityDictionary[selectedCityKey] ?? { ko: selectedCityKey, en: selectedCityKey };
    const cityLabel = cityNames[language] ?? selectedCityKey;
    setText(timezoneLabelEl, strings.timezoneLabel(cityLabel, offset));

    updateCityStates(baseDate);
}

function selectCity(city) {
    if (!city) {
        return;
    }
    selectedCityKey = city.dataset.cityKey;
    currentTimezone = city.dataset.timezone;
    updateActiveCity();
    updateClock();
}

cityElements.forEach((city) => {
    city.addEventListener("click", () => {
        selectCity(city);
    });
});

languageToggle.addEventListener("click", () => {
    language = language === "ko" ? "en" : "ko";
    clearDateFormatterCache();
    updateLanguageTexts();
    updateClock();
});

const initialCity = cityElements.find((city) => city.dataset.cityKey === selectedCityKey) ?? cityElements[0];
if (initialCity) {
    selectedCityKey = initialCity.dataset.cityKey;
    currentTimezone = initialCity.dataset.timezone;
}

updateLanguageTexts();
updateActiveCity();
updateClock();
setInterval(updateClock, 75);
