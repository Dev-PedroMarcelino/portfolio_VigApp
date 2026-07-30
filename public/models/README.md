# Self-hosted 3D models

These `.glb` files are rendered **on our own three.js stage**
(`src/components/demos/local-model-viewer.tsx`): our lighting, our framing, our
orbit controls, a reflection probe built from in-scene softboxes, transparent
background, no iframe and no third-party interface anywhere.

`Model3D` probes for the file at runtime. If one is missing, the demo falls back
to the embedded Sketchfab viewer with all of its UI parameters switched off —
which only fully works for models whose author is on a paid Sketchfab plan (of
ours, just the Porsche). Garagem opts out of the fallback entirely
(`embedFallback={false}`); its hero is a still photo by design.

## What each demo loads

| File | Demo | Source model (licence) |
| --- | --- | --- |
| `free_porsche_911_carrera_4s.glb` | Barcellos — hero stage | (FREE) Porsche 911 Carrera 4S — Lionsharp Studios (CC BY-SA) |
| `white_modern_living_room.glb` | Prumo — "ambientes" tab 1 | White Modern Living Room — dylanheyes (CC BY) |
| `modern_dining_room.glb` | Prumo — tab 2 | Modern Dining Room — dylanheyes (CC BY) |
| `modern_bathroom.glb` | Prumo — tab 3 | Modern Bathroom — dylanheyes (CC BY) |
| `metal_credit_card.glb` | Zela — card section | Metal Credit Card — Maxitaxx (CC BY) |
| `jeremy_george_lake_charles_bitcoin_metal_coin.glb` | Zela — crypto screen | Bitcoin Metal Coin — Jeremy George Lake Charles (CC BY) |
| `air_jordan_1_chicago_black_toe.glb` | VIELA — "Vista 360°" | Air Jordan 1 (Chicago Black Toe) — Shane Vince Marcos (CC BY) |

File names are the Sketchfab download names; the demo's `content.ts` points at
them directly, so a re-download drops straight in.

## These files are optimised — keep them that way

The raw Sketchfab downloads totalled **154 MB**, which no page should carry.
Every file here has been through
[`gltf-transform`](https://gltf-transform.dev) and the set is now **~21 MB**:

```bash
npx @gltf-transform/cli optimize in.glb out.glb --texture-size 2048 --texture-compress webp --compress quantize --simplify false
npx @gltf-transform/cli resize in.glb out.glb --width 1024 --height 1024
```

**Keep textures at 1024.** File size is not the constraint on a phone — VRAM is,
and a WebP texture decompresses to raw RGBA on the GPU. At 2048 the dining room
alone needed ~321 MB of texture memory, which is past what a mid-range phone
gives a tab; the card wanted 64 MB for a 252-triangle mesh. At 1024 the same
scenes sit at 64–81 MB and the card at 16 MB, with no visible loss at the sizes
these models are displayed.

The Porsche additionally needed geometry work — 652k triangles is a desktop-only
figure — and was decimated to ~196k, which halves again on top of the texture
savings:

```bash
npx @gltf-transform/cli simplify in.glb out.glb --ratio 0.3 --error 0.0005
```

| File | raw | here | GPU texture memory |
| --- | --- | --- | --- |
| `modern_bathroom.glb` | 53.6 MB | 5.8 MB | ~80 MB |
| `modern_dining_room.glb` | 34.4 MB | 3.0 MB | ~81 MB |
| `free_porsche_911_carrera_4s.glb` | 25.4 MB | 4.7 MB | ~59 MB |
| `white_modern_living_room.glb` | 24.1 MB | 2.4 MB | ~64 MB |
| `air_jordan_1_chicago_black_toe.glb` | 9.5 MB | 2.8 MB | ~5 MB |
| `jeremy_george_lake_charles_bitcoin_metal_coin.glb` | 5.5 MB | 2.7 MB | 0 (untextured) |
| `metal_credit_card.glb` | 1.8 MB | 0.05 MB | ~16 MB |

Textures are WebP (`EXT_texture_webp`) and geometry is quantized — both read
natively by three.js. Avoid Draco and Meshopt: their decoders are fetched from a
CDN at runtime, which this project deliberately avoids.

## Attribution

All models are CC-licensed and stay credited in page copy through
`ModelCredit` — keep the author line visible wherever a model is shown. CC BY-SA
(the Porsche) additionally requires that derivative model files be shared under
the same licence.
