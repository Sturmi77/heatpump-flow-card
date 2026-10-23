# Heatpump Flow Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://hacs.xyz/docs/faq/custom_repositories)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Validate](https://github.com/Sturmi77/heatpump-flow-card/actions/workflows/validate.yml/badge.svg)](https://github.com/Sturmi77/heatpump-flow-card/actions/workflows/validate.yml)
[![GitHub release](https://img.shields.io/github/v/release/Sturmi77/heatpump-flow-card)](https://github.com/Sturmi77/heatpump-flow-card/releases)

[![Open your Home Assistant instance and open this repository inside HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Sturmi77&repository=heatpump-flow-card&category=plugin)

![Heatpump Flow Card: the animated heat pump schematic in a light and a dark theme](docs/social-preview.png)

An **animated hydraulic schematic** for air-to-water heat pumps in Home Assistant.

It shows electricity flowing from **PV, battery and grid** into the heat pump, the **diverter valve** switching between hot water and heating, colour-coded **tanks**, the **heating circuit** and your rooms. Animation speed follows the real flow rate. The core is vendor-neutral: **presets** make it zero-config for popular heat pumps:

| Preset | Brands / models | Integration | Status |
|---|---|---|---|
| `lambda` | **Lambda** (EU-L series) | [lambda_heat_pumps](https://github.com/GuidoJeuken-6512/lambda_heat_pumps) (HACS) | tested on a real installation |
| `vicare` | **Viessmann** (Vitocal) | [ViCare](https://www.home-assistant.io/integrations/vicare/) (core) | untested |
| `vaillant` | **Vaillant** (aroTHERM, aroTHERM plus), **Saunier Duval**, **Bulex**, **Glow-worm**, **DemirDöküm** | [myPyllant](https://github.com/signalkraft/mypyllant-component) (HACS) | untested |
| `emsesp` | **Bosch**, **Buderus**, **Junkers**, **Nefit**, **Worcester**, **Sieger**, **elm.leblanc**, **iVT** – EMS/EMS+ heat pumps such as Buderus Logatherm WLW, Bosch Compress, Nefit EnviLine | [EMS-ESP](https://github.com/emsesp/EMS-ESP32) gateway (MQTT discovery) | untested |
| `heishamon` | **Panasonic** Aquarea (H, J, K, L generation; monoblock, split, all-in-one) | [HeishaMon](https://github.com/heishamon/HeishaMon) + [heishamon-homeassistant](https://github.com/kamaradclimber/heishamon-homeassistant) (HACS) | untested |
| `samsung` | **Samsung** EHS (Mono, Split, TDM) on the NASA bus | [esphome-samsung-nasa](https://github.com/Beormund/esphome-samsung-nasa) (ESPHome) | tested on a real installation |

> [!NOTE]
> The **Viessmann**, **Vaillant**, **EMS-ESP** and **HeishaMon** presets are **not yet tested with a real installation**. They are built from the source code of the respective integrations and checked with simulated data. Feedback is very welcome: please [open an issue](https://github.com/Sturmi77/heatpump-flow-card/issues) with your entity list if something is missing or wrong. The Lambda preset runs on a real installation.

![Animated demo: heating, hot water and defrost, with the Lambda and Vaillant unit drawings](docs/demo.gif)

**[Try the live demo](https://sturmi77.github.io/heatpump-flow-card/demo/)**: every preset in heating, hot water, defrost and standby, light and dark, English and German, with the matching card configuration. Runs in the browser with simulated data, no Home Assistant needed.

## Features

- **Power sources:** PV / battery / grid → heat pump, animated whenever more than 10 W flow. Taken automatically from your **Energy dashboard** (its power sensors), or from your own sensors.
- **Heat pump:** the fan spins while the compressor runs, faster at higher compressor modulation (or higher power, when the integration has no modulation value); the circuit pumps and the flow lines follow the modulation as well. Shows mode and sub-state, electrical power → heat output, and live COP. Defrost is shown with a snowflake and an icy flow line. The frame of the block is orange while heating, red for hot water and blue while defrosting or cooling, grey in standby. A long status line wraps into mode and status. A backup / inline heater (`heater`) glows inside the unit while it runs.
- **Unit drawing:** the heat pump block shows the outdoor unit: the anthracite Lambda EU-L with its cut-out pattern, or the Vaillant aroTHERM plus in three sizes (one or two fans). Other brands keep the generic fan. The fan spins, the blades turn blue while running, and each fan gets its own snowflake while defrosting.
- **Heat source:** air (the outdoor temperature is shown under the unit; default), **ground** with a brine loop or **groundwater** with two wells (`source_type`), with source inlet and outlet temperatures and the source flow rate.
- **Diverter valve:** shows DHW or heating; the active circuit is animated.
- **Tanks:** DHW tank and buffer with a top/bottom temperature gradient (blue = cold, then cyan and orange, red = hot), target, mode, a heat-exchanger coil while charging, and the circulation pump. **Heater rods** (`dhw_heater`, `buffer_heater`) glow orange while on, red at stage 2 or higher.
- **Heating circuits:** up to **three circuits** (`hc_count`), each with a pump and either an **underfloor loop** or **radiators** with rising heat waves (`hc_type`, `hc2_type`, `hc3_type`), flow and target, plus a house with room temperature, target and outdoor temperature. The heating surface fades from the flow colour to the return colour, so you see the water cooling down.
- **Solar thermal:** with `solar_collector` and `solar_pump` a collector sits on the roof edge of the house and feeds a loop into the DHW tank; the loop runs while the solar pump runs. ViCare preset only, **not yet tested on a real installation**.
- **Heating program:** a chip for eco, night / setback, party and holiday, from the `program` entity or, without one, from the heating circuit mode (e.g. Lambda `ECO`).
- **Flow rates:** shown on the heating-side loop, at the circuit pump (`hc_volume`) and at the source (`source_volume`). Units l/h, l/min and m³/h are converted automatically.
- **Estimated heat output:** without a heat output sensor, the card calculates it from flow rate × spread (≈ marker) and derives the COP from it.
- **Statistics row:** COP heating/DHW today, energy today with PV share, compressor starts, spread, flow rate, plus your own tiles. With `tiles` you pick the tiles, their order and the period (today, yesterday, week, month, year, total) from a **catalog of more than 40 tiles** that the preset fills in: COP per mode and period, electricity and heat per mode, defrost and standby energy, cycles, runtime per start and more. Integrations that only report totals get today, month and so on from Home Assistant's long-term statistics.
- **Status chips:** mode, freely defined badges (e.g. "Boost"), error chip when any error code is ≠ 0.
- **Timeline** (`timeline: true`): a slim strip under the schematic with what the heat pump did over the last 24 hours: heating, hot water, defrost, blocked, standby, from the history of the operating mode. A tap or the arrow keys show start, end and duration of a period.
- **Quick controls** (`controls`): switches and booleans as toggle buttons, buttons and scripts as push buttons, selects, water heater and climate modes as dropdowns, numbers as input fields, directly on the card.
- **Details drawer:** a collapsible section below the statistics with operating hours, total starts, total electricity and heat (and the total COP from them), the **refrigerant circuit** (compressor speed, evaporation, condensation, suction gas, hot gas, liquid line, pressures, expansion valve, superheat, subcooling) and your own values (`details`). Presets fill it where the integration provides the data.
- **Layouts and colours:** `layout: compact` for narrow columns, `layout: wide` puts controls, tiles and details beside the schematic, `layout: wall` adds large type and hides the quick controls until you touch the card (wall tablets). Every colour is a CSS variable (`--hfc-*`) that a theme or card-mod can change.
- **Keyboard and screen readers:** every clickable part is a button you can reach with Tab, move through with the arrow keys and activate with Enter or Space; a focus frame shows where you are, and the parts of the schematic announce their name and value.
- **Optional blocks:** whatever you don't have (buffer, DHW tank, power sources, house) is simply not drawn.
- **UI editor** with grouped entity pickers. **English and German**, following the HA language. Light/dark via your theme. Every element opens the more-info dialog, or runs your own tap, hold or double-tap action (`actions`). `prefers-reduced-motion` is respected.

| Viessmann preset, radiators | Vaillant preset, DHW run | Lambda zero-config, DHW run |
|---|---|---|
| ![](docs/vicare-radiator.png) | ![](docs/vaillant-dhw.png) | ![](docs/zero-config-dhw.png) |

| Details drawer and quick controls | Ground source, two circuits, heater rod | EMS-ESP preset (Buderus) | HeishaMon preset (Panasonic), radiators | Other brand, minimal setup | Dark theme |
|---|---|---|---|---|---|
| ![](docs/details.png) | ![](docs/ground-source.png) | ![](docs/emsesp-heating.png) | ![](docs/heishamon-radiator.png) | ![](docs/other-brand-minimal.png) | ![](docs/dark.png) |

| Live on a real Lambda installation |
|---|
| ![Live view while heating](docs/live-heating.jpg) |

![One card from phone to wall tablet: phone light and dark, compact, wide and wall layout](docs/layouts.png)

![The outdoor unit in the schematic: generic fan, Lambda EU-L and the Vaillant aroTHERM plus in three sizes](docs/units.png)

| Keyboard focus |
|---|
| ![Focus frame around the hot water tank](docs/keyboard-focus.png) |

## Installation

### HACS (custom repository)
Click the **Open in HACS** button above, or:
1. HACS → ⋮ → **Custom repositories** → URL `https://github.com/Sturmi77/heatpump-flow-card`, type **Dashboard**.
2. Install **Heatpump Flow Card** and reload the browser.

### Manual
Copy `dist/heatpump-flow-card.js` to `/config/www/` and add `/local/heatpump-flow-card.js` as a JavaScript module under *Settings → Dashboards → Resources*.

### Other cards with the same name
Several cards on GitHub are called "Heatpump Flow Card" and register the same element name, `heatpump-flow-card`. A browser keeps only the first definition, so with two of them installed the one that loads first answers to `type: custom:heatpump-flow-card`, and the other cannot be reached by that name.

This card therefore also registers under its own names, **Heatpump Hydraulic Card**:

```yaml
type: custom:heatpump-hydraulic-card   # instead of custom:heatpump-flow-card
preset: lambda
```

Both types are the same card with the same options. If you only use this card, nothing changes. If another card already owns the generic name, this card says so in the browser console and the card picker lists it as "Heatpump Hydraulic Card"; use that type in your configuration.

## Quick start

### Lambda (lambda_heat_pumps)
```yaml
type: custom:heatpump-flow-card
preset: lambda
```
That's it. The card finds your entities itself, including the 2nd heating stage as backup heater, total starts, energy and heat, and the refrigerant circuit values for the details drawer (`sensor.<prefix>_hp1_…` with legacy naming, or `sensor.hp1_…` with the new naming). If you have several heat pumps or the detection picks the wrong one, set the prefix explicitly (`prefix: eu08l`) or the unit numbers (`index: {hp: 2, hc: 2}`).

PV, battery and grid come from your Energy dashboard automatically, as long as it has power sensors configured (Settings → Dashboards → Energy). If you already have sensors for the heat pump's share of PV, battery and grid, or want a room average, add them yourself; own `pv` / `battery` / `grid` sensors replace the Energy dashboard:
```yaml
type: custom:heatpump-flow-card
preset: lambda
title: Heat pump
entities:
  room: sensor.living_room_temperature
  pv: sensor.heatpump_power_from_pv          # W
  battery: sensor.heatpump_power_from_battery
  grid: sensor.heatpump_power_from_grid
  energy_today: sensor.heatpump_energy_today # kWh
badges:
  - entity: input_boolean.heatpump_boost
    label: Boost
```

### Viessmann Vitocal (ViCare) – untested, feedback welcome
```yaml
type: custom:heatpump-flow-card
preset: vicare
hc_type: radiator
```
Entities are found through the entity registry (platform `vicare` + translation key), so entity ids and the HA language don't matter. If you have several Viessmann devices, pick one with `device:` (device id, or use the editor).

What you get:
- flow and return of the secondary circuit
- source temperature and flow rate
- DHW tank top and bottom, buffer
- compressor phase, with DHW recognised via "DHW charging"
- compressor running and circulation pump
- COP heating and DHW, energy today, compressor starts
- details: compressor hours and starts, heater rod hours, compressor modulation, inlet/outlet temperatures and pressures, liquid line, subcooling and superheat

ViCare has no live electrical power, so add `power` from a meter if you have one; the heat output is estimated from flow rate × spread. For a Vitocal with a ground source, set `source_type: brine`: the primary circuit supply and return become brine in and out. Circuits 2 and 3 share the same translation keys in ViCare, so map their entities manually (`hc2_flow`, …).

### Vaillant, Saunier Duval, Bulex, Glow-worm, DemirDöküm (myPyllant) – untested, feedback welcome
```yaml
type: custom:heatpump-flow-card
preset: vaillant
```
The home name prefix is detected from `sensor.<home>_energy_manager_state`.

What you get:
- the energy manager state (standby, heating, DHW, cooling) as the mode
- system flow temperature
- DHW tank and buffer
- circuit 0 flow, setpoint and state
- zone room temperature and target
- device power and heating efficiency
- trouble codes

The Vaillant cloud API has no return temperature and no compressor state, and values update every few minutes. Use `index: {hc: 1, dhw: 1}` for a second circuit or DHW system.

### Bosch, Buderus, Junkers, Nefit, Worcester, Sieger, elm.leblanc, iVT (EMS-ESP) – untested, feedback welcome
```yaml
type: custom:heatpump-flow-card
preset: emsesp
```
For heat pumps on the EMS bus via the [EMS-ESP](https://github.com/emsesp/EMS-ESP32) gateway with Home Assistant MQTT discovery. The entity ids come from the EMS-ESP short names (`boiler_hpactivity`, `boiler_hptc1`, …), so the EMS-ESP language does not matter for the ids. An instance prefix from the "multiple instances" entity format (e.g. `sensor.ems_esp_boiler_…`) is detected automatically. Compressor activity texts are understood in English and German.

What you get:
- compressor activity (heating, hot water, cooling, defrost) as the mode
- compressor running, 3-way valve, current compressor power
- heat carrier flow and return (TC1/TC0, falling back to the boiler flow and return)
- flow rate PC0
- air inlet (TL2), or brine inlet and outlet for ground source heat pumps (`source_type: brine`)
- auxiliary heater status as the backup heater
- outdoor temperature
- DHW temperature, target and circulation
- mixer circuit 1 flow and pump
- thermostat room temperature and target
- details: compressor operating time and starts, total energy consumed and supplied, compressor speed, refrigerant temperatures (PL1, PH1, TR3, TR5, TR6)

Without a heat output sensor, the heat output is estimated from flow rate × spread. With `hc_count: 2` (or 3) the mixer and thermostat entities of circuits 2 and 3 are added; `index: {hc: 2}` starts at circuit 2 instead.

### Panasonic Aquarea (HeishaMon) – untested, feedback welcome
```yaml
type: custom:heatpump-flow-card
preset: heishamon
```
For Panasonic Aquarea heat pumps with a [HeishaMon](https://github.com/heishamon/HeishaMon) board and the [heishamon-homeassistant](https://github.com/kamaradclimber/heishamon-homeassistant) integration. Entity ids follow the MQTT topics (`sensor.panasonic_heat_pump_main_main_outlet_temp`, …); a different MQTT prefix is detected automatically.

What you get:
- outlet and inlet temperature
- pump flow (L/min, converted)
- compressor frequency as "running"
- 3-way valve (Room/Tank)
- defrost
- heat power consumption and production, giving a live COP
- outdoor temperature
- DHW temperature and target
- zone 1 water and room temperature; zone 2 becomes heating circuit 2 with `hc_count: 2`
- internal backup heater
- details: operating hours and counter, heater hours, compressor frequency, discharge temperature, high and low pressure, expansion valve

HeishaMon has no "current activity" value: the card shows heating while the compressor runs, hot water when the valve is on "Tank", and defrost from the defrost state. If you use HeishaMon with your own MQTT YAML instead of the integration, map the entities manually (see below).

### Samsung EHS (esphome-samsung-nasa)
```yaml
type: custom:heatpump-flow-card
preset: samsung
```
For Samsung EHS heat pumps (Mono, Split, TDM) with an ESP32 on the F1/F2 (NASA) bus and Beormund's [esphome-samsung-nasa](https://github.com/Beormund/esphome-samsung-nasa) component. The preset is based on its message mapping and builds on top of it: the entity names come from its `example.yaml` and README, plus the names of the installation the preset was tested on (EHS Mono AE050JXYDEH). ESPHome entity ids are `<node>_<name>`, and the names are set in your own YAML, so the node prefix is detected from the 3-way valve together with the error code (`sensor.<node>_3_way_valve`, `sensor.<node>_error_code`). If you named your sensors differently, map those entities manually; the preset fills in the rest.

What you get:
- outlet and return water temperature, flow rate
- compressor status (or the compressor frequency) and defrost
- 3-way valve (`Room (Heating)` / `Tank (DHW)` as a text sensor, or 0/1 as a plain sensor)
- power consumed and produced (last minute), giving a live COP
- outdoor temperature
- DHW tank temperature and target, booster heater in the tank, backup heater
- zone 1 room temperature and target, water law target as the circuit setpoint
- away (outing) mode as the holiday chip
- error code: "No Error" is fine, any other text shows the error chip
- tiles: energy, heat and COP today from the template sensors of `example.yaml`, totals from the NASA counters
- details: total energy consumed and produced, compressor frequency, discharge temperature, expansion valve

Samsung has no "current activity" value: like HeishaMon, the card shows heating while the compressor runs, hot water when the valve is on the tank, and defrost from the defrost sensor. The primary water pump runs for hot water as well, so the heating circuit follows the valve. Some values are not fitted on every unit (no flow sensor, no wattmeter); they stay unknown. Without a wattmeter, add `power` from a meter of your own.

### Any other heat pump
Map your entities and translate your mode states to the card's normalized modes:
```yaml
type: custom:heatpump-flow-card
title: Heat pump
entities:
  mode: sensor.hp_operating_mode
  flow: sensor.hp_flow_temperature
  return: sensor.hp_return_temperature
  power: sensor.hp_power
  dhw_top: sensor.dhw_temperature
  outdoor: sensor.outdoor_temperature
  hc_pump: binary_sensor.heating_circuit_pump
mode_map:
  Heating: heating
  Hot water: dhw
  Defrost: defrost
  Standby: idle
```
Normalized modes: `heating`, `dhw`, `cooling`, `defrost`, `idle`, `blocked`, `frost`, `circulate`, `off` (plus `legionella`, `trailing` for the DHW tank). If your heat pump has a diverter-valve sensor, use `valve` (binary, on = DHW) instead of a DHW mode.

## Configuration

Everything can be set in the **UI editor**. With a preset, the editor shows whether the integration was detected and fills in every entity the preset found ("Found by the preset"). Only your changes are saved: pick another entity to override one, clear a field to hide it (saved as `null`).

| Option | Description |
|---|---|
| `preset` | `lambda`, `vicare`, `vaillant`, `emsesp`, `heishamon`, `samsung` or omit. Fills entities, mode maps and error sensors. |
| `prefix` | Preset prefix (Lambda device name, Vaillant home slug, EMS-ESP instance prefix, HeishaMon MQTT prefix, Samsung ESPHome node). Omit for auto-detection, `""` for unprefixed Lambda ids. |
| `device` | Device id: restricts preset detection to one device (several heat pumps of the same brand). |
| `index` | Unit numbers for presets: `{hp, dhw, buffer, hc}` (default 1; Vaillant counts from 0). |
| `hc_type` | Circuit 1: `underfloor` (default) or `radiator`. |
| `hc_count` | Number of heating circuits, 1 (default) to 3. Presets fill circuits 2 and 3 with the next circuit numbers. |
| `hc2_type`, `hc3_type` | Emitter of circuits 2 and 3 (default `underfloor`). |
| `hc_name`, `hc2_name`, `hc3_name` | Circuit titles (default "Heating circuit 1/2/3"). |
| `source_type` | `air` (default), `brine` (ground loop) or `water` (groundwater wells). |
| `title` | Card title (default: "Heat pump" / "Wärmepumpe"). |
| `language` | `auto` (default), `en`, `de`. |
| `power_threshold` | Counts as running above this electrical power in W (default 100). |
| `power_sources` | `auto` (default): PV / battery / grid from the Energy dashboard unless `pv`, `battery` or `grid` are set. `manual`: only your own sensors. |
| `entities` | Entity overrides (see below). `null` removes a preset entity. |
| `mode_map`, `dhw_mode_map`, `buffer_mode_map`, `hc_mode_map` | Raw state → normalized mode, merged over the preset. |
| `running_states` | Raw `status` values that count as compressor running. |
| `errors` | List of error-code sensors. A value ≠ 0 shows the error chip. |
| `badges` | `[{entity, label}]` chips shown while the entity is on; each can carry `tap_action`, `hold_action` and `double_tap_action`. |
| `program_map` | Raw state of the program entity → `eco`, `night`, `party`, `holiday` or `none`, merged over the preset. Without an entry the card recognises common words (eco, reduced, setback, absenk…, party, holiday, urlaub …). |
| `compressor_speed_max` | Hz or rpm that count as full speed when `compressor_speed` is not a percentage (default: 100 Hz, 6000 rpm). Sets the pace of the animation. |
| `unit_style` | Drawing of the outdoor unit: `auto` (default, the style of the preset: `lambda` for the Lambda preset, `vaillant` for the Vaillant preset, otherwise the generic fan), `generic`, `lambda` or `vaillant`. Ground and groundwater sources keep their loop symbol. |
| `unit_size` | Vaillant aroTHERM plus class: `small` (3.5 and 5.5 kW, one fan, low), `medium` (7.5 kW, one fan, default) or `large` (10.5 and 12.5 kW, two fans). |
| `timeline` | `true` shows a strip with the operating mode of the last hours under the schematic (needs the `mode` entity, or the `compressor` and optionally the `valve`, and the Home Assistant history). |
| `timeline_hours` | Length of the timeline in hours, 3 to 72 (default 24). |
| `layout` | `default`, `compact` (tighter spacing for narrow columns), `wide` (controls, tiles and details beside the schematic when the card is at least 760 px wide) or `wall` (wide, with large type; the quick controls and the details toggle fade out until the card is touched). |
| `wall_timeout` | Seconds the controls of the `wall` layout stay visible after the last touch or mouse move (default 10, `0` = always visible). |
| `actions` | Tap, hold and double-tap actions per element, keyed by entity key: `{dhw_top: {tap_action: {…}}}`. See [Layout, actions and colours](#layout-actions-and-colours). |
| `controls` | Quick controls: list of entity ids or `{entity, name}`. Supported: `switch`, `input_boolean`, `light`, `fan`, `automation` (toggle), `button`, `input_button`, `script`, `scene` (press), `select`, `input_select`, `water_heater`, `climate` (dropdown), `number`, `input_number` (input). |
| `details` | Extra rows in the details drawer: list of entity ids or `{entity, name, unit, decimals}`. |
| `details_open` | Open the details drawer by default (default `false`). |
| `tiles` | Your own tile selection, in this order: catalog keys with an optional period (`cop_heating`, `cop_heating:month`, `{key, period, name, decimals, unit}`) and free entities (`{entity, name, unit, decimals}`). Every tile can carry `tap_action`, `hold_action` and `double_tap_action`. Without `tiles` the default tiles are shown; `tiles: []` hides the row. See [Stat tiles](#stat-tiles). |
| `price` | Electricity price per kWh for the `cost` tile: a number or an entity (e.g. a dynamic tariff; ct/kWh and per-MWh prices are converted). `currency` overrides the currency from the HA settings. |
| `stats` | Extra tiles `[{entity, name, unit, decimals}]`, added after the default tiles or after `tiles`; also with `tap_action`, `hold_action`, `double_tap_action`. |

**Entity keys:**
- **Heat pump:** `mode`, `status`, `compressor` (binary, or frequency/speed > 0), `defrost` (binary), `power` (W or kW), `heat` (kW or W), `flow`, `return`, `volume`, `source_volume`, `source_in`, `source_out`, `outdoor`, `valve` (binary, or a state like `Tank`/`DHW`), `heater` (backup / inline heater)
- **Storage:** `dhw_top`, `dhw_bottom`, `dhw_target`, `dhw_mode`, `circulation`, `dhw_heater`, `buffer_top`, `buffer_bottom`, `buffer_mode`, `buffer_heater`, `solar_collector`, `solar_pump` (needs the DHW tank)
- **Heating circuit and house:** `hc_flow`, `hc_return`, `hc_setpoint`, `hc_mode`, `hc_pump`, `hc_volume`, `room`, `room_target`, `program` (eco, night, party, holiday)
- **Circuits 2 and 3:** the same keys with `hc2_` / `hc3_` (`hc2_flow`, `hc2_pump`, …)
- **Heaters** (`heater`, `dhw_heater`, `buffer_heater`): binary or on/off, a power value (on above 0) or a stage number (1-3)
- **Power sources (W):** `pv`, `battery`, `grid` – the heat pump's power from each source. Optional: without them the card uses the Energy dashboard.
- **Statistics:** `cop_heating_today`, `cop_dhw_today`, `energy_today`, `pv_share_today`, `starts_today`
- **Details, operation:** `hours`, `starts_total`, `aux_hours`, `energy_total`, `heat_total`
- **Details, refrigerant circuit:** `compressor_speed`, `evap_temp`, `cond_temp`, `suction_temp`, `hot_gas`, `liquid_temp`, `low_pressure`, `high_pressure`, `eev`, `superheat`, `subcooling`

### Stat tiles
In the UI editor, switch on **Own tile selection**. The editor then offers only the tiles your installation can fill; drag them to sort. Enter an electricity price (a number or an entity) to get the cost tile. In YAML:

```yaml
price: sensor.epex_spot_price   # or a number, e.g. 0.30
tiles:
  - cop_heating               # without a period: today if possible, else the current value or the total
  - cop_heating:month
  - key: energy
    period: today
  - starts
  - defrosts:yesterday
  - cost:month                # electricity × price, currency from the HA settings
  - key: energy_heating
    period: month
    tap_action:               # any Home Assistant action; default: more-info
      action: navigate
      navigation_path: /energy
    hold_action:
      action: more-info
  - entity: sensor.my_value   # any entity as a tile
    name: My value
```

**Cost:** with a fixed price, cost = electricity of the period × price. With a price entity that has long-term statistics (`state_class: measurement`, true for most tariff sensors), the card bills every hour at that hour's mean price, from Home Assistant's long-term statistics. The current hour, which is not yet in the statistics, is billed at the current price. For the year the card uses daily values and for the total monthly values, so these are marked **≈**. A price entity without statistics is applied to the whole period at its current price, also marked **≈**. A tile can have its own `price` and `currency`. If your tariff sensor once changed its unit (for example from ct/kWh to €/kWh), its older statistics keep the old values and the cost for longer periods comes out too high. In that case, fix the statistics under Developer tools > Statistics.

**Actions:** a tap opens the more-info dialog of the tile's entity. `tap_action`, `hold_action` (500 ms) and `double_tap_action` accept every Home Assistant action (`more-info`, `navigate`, `url`, `toggle`, `perform-action`, `assist`, `none`, with `confirmation`). Tiles with their own name, entity, price or action are edited in YAML.

Periods: `now`, `today`, `yesterday`, `week`, `month`, `year`, `total`. A tile is only shown when the installation can fill it. Values come from, in this order:
1. the preset's own entity for that period (e.g. Lambda `hp1_heating_cop_monthly`)
2. for the default tiles' entities (`cop_heating_today` …): "today"
3. the change over the period from Home Assistant's **long-term statistics** of a total counter (needs `state_class: total_increasing`, true for most energy counters). This gives EMS-ESP and others "today", "this month" and so on, although they only report totals.
4. computed from two other tiles, marked **≈**: COP = heat ÷ electricity of the same period, runtime per start = hours ÷ starts.

| Group | Tile keys |
|---|---|
| Efficiency | `cop_live`, `cop_heating`, `cop_dhw`, `cop_cooling`, `cop_total`, `spf` (year) |
| Electricity | `energy`, `energy_heating`, `energy_dhw`, `energy_cooling`, `energy_defrost`, `energy_standby`, `energy_aux` (heater) |
| Heat | `heat`, `heat_heating`, `heat_dhw`, `heat_cooling`, `heat_defrost` |
| Starts and runtime | `starts`, `cycles_heating`, `cycles_dhw`, `cycles_cooling`, `defrosts`, `hours`, `hours_per_start`, `load_classes`, `aux_hours`, `aux_starts` |
| Live | `spread`, `volume`, `heat_estimated`, `power`, `heat_live`, `compressor_speed`, `source_spread`, `outdoor`, `dhw_top`, `room`, `pv_share` |
| Other | `pv_production`, `solar_thermal` (ViCare), `cost` |

What the presets provide:
- **Lambda:** COP heating/DHW/cooling per day, month, year and in total; electricity and heat per mode including defrost and standby; starts, heating/DHW/cooling cycles and defrosts per day and yesterday.
- **ViCare:** COP and SPF, electricity per day, week, month and year (total, heating, DHW, cooling), compressor hours, starts and load classes, heater rod hours and starts, PV and solar thermal yield.
- **EMS-ESP:** totals for electricity, heat, starts and hours per mode; other periods from long-term statistics.
- **HeishaMon:** heat and electricity per mode as current power, so the COP tiles work for "now"; operating hours and starts.
- **Samsung:** electricity, heat and COP today (template sensors of `example.yaml`) and in total; other periods from long-term statistics.
- **Vaillant:** daily electricity and heat for heating and DHW.

### Layout, actions and colours
**Layout.** `layout: compact` reduces padding and type sizes for narrow dashboard columns. `layout: wide` shows the schematic on the left and controls, tiles and the details drawer on the right once the card is at least 760 px wide (below that it falls back to the normal stacked layout), which suits wall tablets. `layout: wall` is the wide layout with about 30 % larger type for reading from a distance. The quick controls and the details toggle are invisible and not clickable until a touch or mouse move wakes the card; after `wall_timeout` seconds (default 10) they fade out again and an open details drawer closes. A control in use, such as an open dropdown, keeps the card awake. All layouts are also in the editor.

**Actions on elements.** Every element of the schematic shows an entity, and a tap opens its more-info dialog. To change that, give the entity key of the element (see "Entity keys") its own actions. They accept every Home Assistant action, the same as the tiles: `more-info`, `navigate`, `url`, `toggle`, `perform-action`, `assist`, `none`, with `confirmation`. A hold takes 500 ms.

```yaml
actions:
  dhw_top:                      # the hot water tank
    tap_action:
      action: navigate
      navigation_path: /lovelace/hot-water
    hold_action:
      action: more-info
  mode:                         # the heat pump block and the mode chip
    double_tap_action:
      action: perform-action
      perform_action: script.heat_pump_boost
badges:
  - entity: input_boolean.boost
    label: Boost
    tap_action:
      action: toggle
```

An action for a key the card has no entity for does nothing; the browser console says so. Actions are edited in YAML.

**Narrow cards.** The type size follows the width of the schematic, not the screen: below about 640 px the labels grow, below about 500 px (phones, narrow columns) they grow further and secondary labels (flow rates, tank bottom temperature, the VL / RL prefixes, valve and circulation labels, the hot water target line) are left out, so the important numbers stay readable. Chip text takes the colour of your theme text, so it reads in light and dark themes.

**Colours.** The card draws with these CSS variables. Set them in a theme or per card with card-mod; without a value the default applies.

| Variable | Default | Used for |
|---|---|---|
| `--hfc-heat` | `#f97316` | running heat pump, heating chip, heater rod, impeller, heat waves |
| `--hfc-hot` | `#dc2626` | hot water chip, error chip, second heater stage |
| `--hfc-cool` | `#38bdf8` | fan blades while running, groundwater |
| `--hfc-cool-strong` | `#0ea5e9` | snowflake, circulation pump |
| `--hfc-defrost` | `#7dd3fc` | flow pipe while defrosting or cooling |
| `--hfc-flow-cold`, `--hfc-flow-hot` | `#fb923c`, `#dc2626` | flow pipes, 25 to 55 °C |
| `--hfc-return-cold`, `--hfc-return-hot` | `#7dd3fc`, `#2563eb` | return pipes, 20 to 45 °C |
| `--hfc-tank-cold`, `--hfc-tank-cool`, `--hfc-tank-warm`, `--hfc-tank-hot` | `#3b82f6`, `#22d3ee`, `#f97316`, `#ef4444` | tank gradient in four steps, 20 to 58 °C |
| `--hfc-anthracite` | `#3b4148` | dark casings: Lambda unit, dark panel of the Vaillant unit |
| `--hfc-casing` | `#e6e9ec` | light casing of the Vaillant unit |
| `--hfc-pv`, `--hfc-battery`, `--hfc-grid` | `#f59e0b`, `#10b981`, `#94a3b8` | power sources and their flow lines |
| `--hfc-good` | `#16a34a` | live COP |
| `--hfc-badge` | `#a855f7` | badge chips |
| `--hfc-brine`, `--hfc-ground` | `#60a5fa`, `#a16207` | brine pipes, ground loop |
| `--hfc-flow-dash` | `rgba(255,255,255,.9)` | the moving dashes in the pipes |

```yaml
type: custom:heatpump-flow-card
preset: lambda
card_mod:
  style: |
    :host {
      --hfc-heat: #14b8a6;
      --hfc-tank-hot: #f43f5e;
    }
```

### Keyboard and screen readers
The card works without a mouse or touch screen.
- **Tab** goes through the header chips, then the schematic, the quick controls, the tiles and the details toggle. The schematic, the tiles and the details are one tab stop each: inside them the **arrow keys** move to the next or previous part, **Home** and **End** jump to the first and last. A frame (in the theme's primary colour) marks the focused part.
- **Enter** or **Space** runs the tap action (by default the more-info dialog), **Shift+Enter** runs the hold action and **Alt+Enter** the double-tap action, so `tap_action`, `hold_action` and `double_tap_action` are all reachable from the keyboard.
- Parts of the schematic are buttons with a label made of the entity name and its current value, for example "Flow temperature: 32.4 °C". Parts without a value (empty labels, labels hidden on narrow cards) are skipped.
- The quick controls and the details toggle are ordinary buttons, dropdowns and inputs. With `layout: wall` the controls appear as soon as one of them gets the focus.

## Where the numbers come from
The card shows what your integration provides and does not invent values. Where it has to derive something, this is how:

| Value | Source |
|---|---|
| Temperatures, power, flow rate, daily COP, energy, starts | Read directly from the entities. Units are converted (W/kW, l/h, l/min, m³/h); nothing else is changed. |
| Spread | Flow minus return temperature. |
| Heat output | The heat output entity if there is one. Otherwise **estimated** as flow rate × spread × 1.163 Wh/(l·K) (water) and marked with **≈**. With glycol in the circuit the estimate is slightly too high. |
| Live COP | Heat output ÷ electrical power while the compressor runs. Marked with **≈** when the heat output is estimated. |
| Running | Compressor entity on (or frequency/speed > 0), electrical power above `power_threshold` (default 100 W), or a running status from the preset. |
| Mode | The operating-mode entity, translated by the preset's `mode_map`. Without a mode entity (e.g. HeishaMon): compressor off = standby, defrost entity on = defrost, valve on DHW = hot water, otherwise heating. |
| Diverter valve | The valve entity (on, `Tank` or `DHW` = hot water), otherwise the mode. |
| Heating circuit active | Circuit pump, else circuit mode, else "heat pump is heating". |
| PV / battery / grid flows | Your own `pv` / `battery` / `grid` sensors if set. Otherwise **estimated** from the Energy dashboard and marked with **≈**: the heat pump's power is split by the house's current supply mix (PV used in the house, battery discharge, grid import); PV first covers battery charging and export. Needs the power sensors of the Energy dashboard and the heat pump's `power`. A flow is animated above 10 W. |
| Superheat, subcooling | The integration's value if there is one. Otherwise superheat = suction gas − evaporation and subcooling = condensation − liquid line. |
| COP total | Total heat ÷ total electricity (Wh, kWh and MWh are converted), marked with **≈**. |
| Tiles for a period | The integration's own entity for the period, otherwise the change of a total counter over the calendar period from the long-term statistics (refreshed every 5 minutes). A COP for a period without an own entity is heat ÷ electricity of that period, marked with **≈**. |
| Cost | Electricity × price. With a dynamic tariff: every hour at its mean price from the long-term statistics, the current hour at the current price; year and total from daily or monthly values (**≈**). |
| Details drawer | Entities that are unknown or unavailable are left out, so values a model does not report do not show up. |
| Heater rods | On for a binary on / "On", for power above 0, or for a stage number above 0; stage 2 or higher is drawn red. |
| Error chip | Any error entity of the preset (or `errors`) with a value ≠ 0 or state on. |

Each preset section above lists the entities it uses.

![UI editor](docs/editor.jpg)

## Topology
The layout is fixed on purpose: one heat pump (air, brine or groundwater), a diverter valve, an optional DHW tank, an optional buffer and up to three heating circuits (underfloor or radiators). That covers most single-family installations. Combined/layered storage and solar thermal are not drawn (yet).

## Adding a preset
Presets live in `HFC_PRESETS` in `dist/heatpump-flow-card.js`. A preset consists of:
- `detect(ctx)`, which returns a prefix, or `undefined` when the integration is missing
- `entities(prefix, index, ctx)`, which returns the entity map; values may be candidate lists, and the first existing entity wins
- optional `errors`
- the mode maps
- `running_states`, `status_labels` and `stat_labels`
- optional `tiles(prefix, index, ctx)`, which returns `{ tile: { period: entity } }` for the stat tile catalog; a `total` counter with long-term statistics also covers today, yesterday, week, month and year

`ctx.key(platform, domain, translation_key)` looks entities up in the entity registry, independent of language and entity ids. `ctx.match(regex, platform)` matches entity ids by pattern.

Pull requests for other brands are very welcome.

## Feedback
- **Your heat pump works (or not) with a preset?** Please use the [preset feedback form](https://github.com/Sturmi77/heatpump-flow-card/issues/new?template=preset_feedback.yml) – "works" reports help as much as bug reports.
- **Another brand?** Use the same form with "Request a new brand" and paste your entity list.
- **Something broken?** [Bug report](https://github.com/Sturmi77/heatpump-flow-card/issues/new?template=bug_report.yml).
- **Questions, ideas, showing off your setup?** Join the [Home Assistant Community thread](https://community.home-assistant.io/t/card-heatpump-flow-card-animated-hydraulic-schematic-for-heat-pumps-lambda-viessmann-vaillant-bosch-buderus-panasonic/1029598).

## Development
`demo/index.html` renders the card with simulated installations and scenarios (heating, DHW, defrost, standby with error, light/dark, English/German) without Home Assistant. It is published as the [live demo](https://sturmi77.github.io/heatpump-flow-card/demo/) via GitHub Pages; locally, open it through any static web server. The simulated installations live in `demo/setups.js`.

`test/selftest.html` runs every installation in every scenario, broken entity states, edge-case configs, preset detection (gas boilers must not be detected as heat pumps) and the computed values. CI runs it in headless Chrome on every push; locally:
```bash
google-chrome --headless=new --allow-file-access-from-files --virtual-time-budget=15000 --dump-dom "file://$PWD/test/selftest.html" | grep -A3 'id="result"'
```

## Deutsch (Kurzfassung)
Animiertes Hydraulikschema für Luft-Wasser-Wärmepumpen: Strom aus PV, Akku und Netz (automatisch aus dem Energie-Dashboard oder aus eigenen Sensoren) → Wärmepumpe → Umschaltventil → Warmwasser bzw. Puffer → Heizkreis. Voreinstellungen erkennen die Entitäten automatisch für: Lambda; Viessmann (ViCare); Vaillant, Saunier Duval, Bulex, Glow-worm, DemirDöküm (myPyllant); Bosch, Buderus, Junkers, Nefit, Worcester, Sieger, elm.leblanc, iVT (EMS-ESP); Panasonic Aquarea (HeishaMon); Samsung EHS (esphome-samsung-nasa). Lambda und Samsung sind mit einer echten Anlage getestet, alle anderen Voreinstellungen noch nicht – Rückmeldungen gern als Issue. Andere Hersteller werden über `entities` und `mode_map` angebunden. Schnellbedienung (Schalter, Tasten, Auswahl, Zahlen) und ein aufklappbarer Detailbereich mit Betriebsstunden, Zählern und Kältekreis. Die Kacheln unter dem Schema lassen sich aus einem Katalog mit über 40 Kennzahlen zusammenstellen (COP, Strom und Wärme je Betriebsart, Abtauungen, Laufzeit pro Start …), jeweils für heute, gestern, Woche, Monat, Jahr oder gesamt; fehlende Zeiträume kommen aus der Langzeitstatistik von Home Assistant. Eine Kostenkachel rechnet mit festem Preis oder bei dynamischem Tarif stundengenau ab; jede Kachel und jedes Element des Schemas kann eine eigene Tipp-, Halte- oder Doppeltipp-Aktion haben. Heizprogramme (Eco, Nacht, Party, Urlaub) erscheinen als Chip, die Animation folgt der Verdichterleistung, und eine Solarthermie-Anlage (noch ungetestet) wird als Kollektor am Dach mit Kreis zum Warmwasserspeicher gezeichnet. Das Außengerät wird als Zeichnung dargestellt: die anthrazitfarbene Lambda EU-L oder die Vaillant aroTHERM plus in drei Größen (ein oder zwei Lüfter), andere Hersteller behalten den allgemeinen Lüfter. Die Karte lässt sich per Tastatur bedienen: Tab, Pfeiltasten im Schema, Enter oder Leertaste für die Aktion (Umschalt+Enter halten, Alt+Enter doppelt tippen), mit sichtbarem Fokusrahmen und Beschriftungen für Screenreader. Das Layout gibt es kompakt (schmale Spalten), breit (Kacheln neben dem Schema) und als Wanddisplay (große Schrift, Bedienelemente erscheinen erst nach einer Berührung und blenden wieder aus); alle Farben lassen sich über CSS-Variablen (`--hfc-*`) in einem Theme oder mit card-mod ändern. Bis zu drei Heizkreise, jeweils als Flächenheizung oder Heizkörper. Wärmequelle Luft, Erdreich (Sole) oder Grundwasser; Heizstäbe in Speicher und Puffer sowie ein Zusatzheizer werden angezeigt. Volumenströme werden angezeigt, die Wärmeleistung wird bei Bedarf daraus berechnet. Grafischer Editor und Oberfläche auf Deutsch und Englisch. Ausprobieren ohne Installation: [Live-Demo](https://sturmi77.github.io/heatpump-flow-card/demo/).

## License
MIT © 2026 Sturmi77
