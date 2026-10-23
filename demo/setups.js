// Simulated installations shared by the live demo (demo/index.html) and the self-test (test/selftest.html).
const lambdaStates = (x, s) => {
  const v = {
    [`${x}hp1_operating_state`]: 'CH', [`${x}hp1_state`]: 'REGULATION',
    [`${x}hp1_inverter_power_consumption`]: '1240', [`${x}hp1_actual_heating_capacity`]: '6.3',
    [`${x}hp1_flow_line_temperature`]: '32.4', [`${x}hp1_return_line_temperature`]: '27.9',
    [`${x}hp1_volume_flow_heat_sink`]: '2281', [`${x}hp1_energy_source_inlet_temperature`]: '9.8',
    [`${x}ambient_temperature_calculated`]: '10.4',
    [`${x}boil1_actual_high_temperature`]: '46.0', [`${x}boil1_actual_low_temperature`]: '38.5',
    [`${x}boil1_target_high_temperature`]: '50.0', [`${x}boil1_operating_state`]: 'STBY',
    [`${x}boil1_actual_circulation_pump_state`]: 'Off',
    [`${x}buff1_actual_high_temperature`]: '31.2', [`${x}buff1_actual_low_temperature`]: '27.4', [`${x}buff1_operating_state`]: 'HEATING',
    [`${x}hc1_flow_line_temperature`]: '30.1', [`${x}hc1_flow_line_temperature_setpoint`]: '30.2', [`${x}hc1_operating_state`]: 'HEATING',
    [`${x}hc1_room_device_temperature`]: 'unknown', [`${x}hc1_target_room_temperature`]: '23.0',
    [`${x}hp1_heating_cop_daily`]: '5.05', [`${x}hp1_hot_water_cop_daily`]: '4.15', [`${x}hp1_compressor_start_cycling_daily`]: '3',
    [`${x}hp1_relais_state_2nd_heating_stage`]: 'Off',
    [`${x}hp1_heating_cop_monthly`]: '4.62', [`${x}hp1_heating_cop_yearly`]: '4.48', [`${x}hp1_heating_cop_total`]: '4.51',
    [`${x}hp1_hot_water_cop_monthly`]: '3.95',
    [`${x}hp1_heating_energy_daily`]: ['4.2', 'kWh'], [`${x}hp1_heating_thermal_energy_daily`]: ['20.4', 'kWh'],
    [`${x}hp1_hot_water_energy_daily`]: ['0.9', 'kWh'], [`${x}hp1_hot_water_thermal_energy_daily`]: ['3.7', 'kWh'],
    [`${x}hp1_heating_energy_total`]: { state: '2410.2', attributes: { unit_of_measurement: 'kWh', state_class: 'total_increasing' } },
    [`${x}hp1_compressor_start_cycling_yesterday`]: '5', [`${x}hp1_defrost_cycling_daily`]: '2', [`${x}hp1_defrost_cycling_yesterday`]: '4',
    [`${x}hp1_stby_energy_daily`]: ['0.12', 'kWh'],
    [`${x}hp1_compressor_start_cycling_total`]: ['1843', 'cycles'],
    [`${x}hp1_compressor_power_consumption_accumulated`]: ['3120.4', 'kWh'],
    [`${x}hp1_compressor_thermal_energy_output_accumulated`]: ['14210.8', 'kWh'],
    [`${x}hp1_compressor_unit_rating`]: ['46', '%'],
    [`${x}hp1_evaporation_temperature`]: ['3.6', '°C'], [`${x}hp1_condensation_temperature`]: ['36.9', '°C'],
    [`${x}hp1_suction_gas_temperature`]: ['8.4', '°C'], [`${x}hp1_hot_gas_temperature`]: ['61.5', '°C'],
    [`${x}hp1_subcooling_temperature`]: ['3.1', '°C'], [`${x}hp1_expansion_valve_opening_angle`]: ['38', '%'],
    [`${x}hp1_error_number`]: '0', [`${x}boil1_error_number`]: '0', [`${x}buff1_error_number`]: '0', [`${x}hc1_error_number`]: '0', [`${x}ambient_error_number`]: '0',
  };
  const S = {
    heat: {},
    dhw: { [`${x}hp1_compressor_unit_rating`]: ['62', '%'], [`${x}hp1_condensation_temperature`]: ['52.4', '°C'], [`${x}hp1_hot_gas_temperature`]: ['78.0', '°C'],
      [`${x}hp1_operating_state`]: 'DHW', [`${x}boil1_operating_state`]: 'DHW', [`${x}buff1_operating_state`]: 'STBY',
      [`${x}hp1_flow_line_temperature`]: '48.6', [`${x}hp1_return_line_temperature`]: '43.1', [`${x}hp1_inverter_power_consumption`]: '1650',
      [`${x}hp1_actual_heating_capacity`]: '6.9', [`${x}boil1_actual_circulation_pump_state`]: 'On' },
    defrost: { [`${x}hp1_operating_state`]: 'DEFROST', [`${x}hp1_flow_line_temperature`]: '24.0', [`${x}hp1_actual_heating_capacity`]: '0',
      [`${x}hp1_relais_state_2nd_heating_stage`]: 'On' },
    idle: { ...Object.fromEntries(['compressor_unit_rating', 'evaporation_temperature', 'condensation_temperature', 'suction_gas_temperature',
        'hot_gas_temperature', 'subcooling_temperature', 'expansion_valve_opening_angle'].map((k) => [`${x}hp1_${k}`, 'unknown'])),
      [`${x}hp1_operating_state`]: 'STBY', [`${x}hp1_state`]: 'READY', [`${x}hp1_inverter_power_consumption`]: '0',
      [`${x}hp1_actual_heating_capacity`]: '0', [`${x}buff1_operating_state`]: 'STBY', [`${x}hp1_error_number`]: '7' },
  }[s];
  const out = {};
  for (const [k, val] of Object.entries({ ...v, ...S })) out[`sensor.${k}`] = val;
  return out;
};
const extras = (s) => ({
  'sensor.living_room_temperature': '22.8', 'sensor.heatpump_energy_today': '5.1', 'sensor.heatpump_pv_share_today': '24',
  'sensor.heatpump_power_from_pv': s === 'heat' ? '820' : '0', 'sensor.heatpump_power_from_battery': s === 'dhw' ? '1650' : '0',
  'sensor.heatpump_power_from_grid': s === 'heat' ? '420' : (s === 'defrost' ? '900' : '0'),
  'input_boolean.heatpump_boost': { state: s === 'dhw' ? 'on' : 'off', attributes: { friendly_name: 'Boost' } },
  'select.heatpump_operating_mode': { state: 'Automatic', attributes: { friendly_name: 'Operating mode', options: ['Automatic', 'Manual', 'Summer', 'Off'] } },
  'number.heatpump_dhw_target': { state: '50', attributes: { friendly_name: 'DHW target', min: 40, max: 60, step: 1, unit_of_measurement: '°C' } },
  'button.heatpump_dhw_boost': { state: 'unknown', attributes: { friendly_name: 'DHW boost once' } },
  'sensor.heating_curve_flow': ['33.5', '°C'],
  // Heating program and a solar thermal collector (pump runs while the collector is hotter than the tank).
  'select.heatpump_heating_program': { state: { heat: 'Eco', dhw: 'Party', defrost: 'Night', idle: 'Holiday' }[s], attributes: { friendly_name: 'Heating program' } },
  'sensor.heatpump_solar_collector': [{ heat: '58.4', dhw: '71.0', defrost: '12.5', idle: '44.0' }[s], '°C'],
  'binary_sensor.heatpump_solar_pump': s === 'heat' || s === 'dhw' ? 'on' : 'off',
});
const otherStates = (s) => ({
  'sensor.wp_betriebsart': { heat: 'Heating', dhw: 'Hot water', defrost: 'Defrost', idle: 'Standby' }[s],
  'sensor.wp_vorlauf': { heat: '35.2', dhw: '52.0', defrost: '22', idle: '29' }[s],
  'sensor.wp_ruecklauf': { heat: '30.4', dhw: '46.5', defrost: '24', idle: '28.5' }[s],
  'sensor.wp_leistung': { heat: '1800', dhw: '2100', defrost: '900', idle: '3' }[s],
  'sensor.ww_temperatur': '47.5', 'sensor.aussen': '-2.4',
  'binary_sensor.heizkreispumpe': s === 'idle' ? 'off' : 'on',
});

// ViCare: German entity ids, resolved via translation_key in the entity registry. Values may carry units.
const vicareReg = {
  'sensor.vitocal_verdichterphase': 'compressor_phase', 'binary_sensor.vitocal_verdichter': 'compressor',
  'binary_sensor.vitocal_warmwasser_laden': 'domestic_hot_water_charging', 'sensor.vitocal_vorlauf_sekundar': 'secondary_circuit_supply_temperature',
  'sensor.vitocal_rucklauf_sekundar': 'secondary_circuit_return_temperature', 'sensor.vitocal_volumenstrom': 'volumetric_flow',
  'sensor.vitocal_vorlauf_primar': 'primary_circuit_supply_temperature', 'sensor.vitocal_aussentemperatur': 'outside_temperature',
  'sensor.vitocal_speicher_oben': 'dhw_storage_top_temperature', 'sensor.vitocal_speicher_unten': 'dhw_storage_bottom_temperature',
  'binary_sensor.vitocal_heizkreispumpe': 'circulation_pump', 'sensor.vitocal_cop_heizen': 'cop_heating', 'sensor.vitocal_cop_ww': 'cop_dhw',
  'sensor.vitocal_stromverbrauch_heute': 'power_consumption_today', 'sensor.vitocal_verdichterstarts': 'compressor_starts',
};
const vicareStates = (s) => ({
  'sensor.vitocal_verdichterphase': { heat: 'heating', dhw: 'heating', defrost: 'defrost', idle: 'pause' }[s],
  'binary_sensor.vitocal_verdichter': s === 'idle' ? 'off' : 'on', 'binary_sensor.vitocal_warmwasser_laden': s === 'dhw' ? 'on' : 'off',
  'sensor.vitocal_vorlauf_sekundar': [{ heat: '42.5', dhw: '51.0', defrost: '25', idle: '30' }[s], '°C'],
  'sensor.vitocal_rucklauf_sekundar': [{ heat: '36.0', dhw: '45.5', defrost: '27', idle: '29.5' }[s], '°C'],
  'sensor.vitocal_volumenstrom': [s === 'idle' ? '0' : '0.95', 'm³/h'], 'sensor.vitocal_vorlauf_primar': ['2.1', '°C'],
  'sensor.vitocal_aussentemperatur': ['1.4', '°C'], 'sensor.vitocal_speicher_oben': ['49.0', '°C'], 'sensor.vitocal_speicher_unten': ['41.0', '°C'],
  'binary_sensor.vitocal_heizkreispumpe': s === 'idle' ? 'off' : 'on', 'sensor.vitocal_cop_heizen': '3.9', 'sensor.vitocal_cop_ww': '3.1',
  'sensor.vitocal_stromverbrauch_heute': ['8.4', 'kWh'], 'sensor.vitocal_verdichterstarts': '4123',
});
const vaillantStates = (s) => ({
  'sensor.zuhause_energy_manager_state': { heat: 'HEATING', dhw: 'DHW', defrost: 'HEATING', idle: 'STANDBY' }[s],
  'sensor.zuhause_system_flow_temperature': [{ heat: '34.0', dhw: '52.5', defrost: '30', idle: '28' }[s], '°C'],
  'sensor.zuhause_outdoor_temperature': ['3.5', '°C'], 'sensor.zuhause_domestic_hot_water_0_tank_temperature': ['47.0', '°C'],
  'sensor.zuhause_domestic_hot_water_0_setpoint': ['50', '°C'], 'sensor.zuhause_circuit_0_current_flow_temperature': ['32.8', '°C'],
  'sensor.zuhause_circuit_0_flow_temperature_setpoint': ['33.5', '°C'], 'sensor.zuhause_circuit_0_state': s === 'idle' ? 'STANDBY' : 'HEATING',
  'sensor.zuhause_device_1_arotherm_plus_current_power': [s === 'idle' ? '0.01' : '1.35', 'kW'],
  'sensor.zuhause_zone_wohnen_current_temperature': ['21.6', '°C'], 'sensor.zuhause_zone_wohnen_desired_temperature': ['21.5', '°C'],
  'binary_sensor.zuhause_trouble_codes': s === 'idle' ? 'on' : 'off',
});

// EMS-ESP (Bosch/Buderus …), German enum texts, entity format with instance prefix.
const emsStates = (s) => ({
  'sensor.ems_esp_boiler_hpactivity': { heat: 'Heizen', dhw: 'Warmwasser', defrost: 'Abtauen', idle: 'aus' }[s],
  'binary_sensor.ems_esp_boiler_hpcompon': s === 'idle' ? 'off' : 'on', 'binary_sensor.ems_esp_boiler_hp3way': s === 'dhw' ? 'on' : 'off',
  'sensor.ems_esp_boiler_hpcurrpower': [{ heat: '1450', dhw: '1900', defrost: '700', idle: '0' }[s], 'W'],
  'sensor.ems_esp_boiler_hptc1': [{ heat: '38.5', dhw: '52.0', defrost: '24', idle: '29' }[s], '°C'],
  'sensor.ems_esp_boiler_hptc0': [{ heat: '33.0', dhw: '46.5', defrost: '27', idle: '28.5' }[s], '°C'],
  'sensor.ems_esp_boiler_pc0flow': [s === 'idle' ? '0' : '1080', 'l/h'], 'sensor.ems_esp_boiler_hptl2': ['3.4', '°C'],
  'sensor.ems_esp_boiler_outdoortemp': ['2.8', '°C'], 'sensor.ems_esp_boiler_dhw_curtemp': ['47.5', '°C'], 'sensor.ems_esp_boiler_dhw_seltemp': ['52', '°C'],
  'sensor.ems_esp_thermostat_hc1_currtemp': ['21.4', '°C'], 'sensor.ems_esp_thermostat_hc1_seltemp': ['21.5', '°C'],
  'sensor.ems_esp_mixer_hc1_flowtemphc': ['34.0', '°C'],
  // Totals only; today and month come from the simulated long-term statistics (emsStatistics).
  'sensor.ems_esp_boiler_nrgconscompheating': { state: '4210.5', attributes: { unit_of_measurement: 'kWh', state_class: 'total_increasing' } },
  'sensor.ems_esp_boiler_nrgsuppheating': { state: '17890.2', attributes: { unit_of_measurement: 'kWh', state_class: 'total_increasing' } },
  'sensor.ems_esp_boiler_totalcompstarts': { state: '5123', attributes: { state_class: 'total_increasing' } },
  'sensor.ems_esp_boiler_uptimetotal': { state: '312450', attributes: { unit_of_measurement: 'min', state_class: 'total_increasing' } },
});
const emsStatistics = {
  'sensor.ems_esp_boiler_nrgconscompheating': { today: 9.6, yesterday: 12.1, week: 58.3, month: 210.4, year: 1890.7 },
  'sensor.ems_esp_boiler_nrgsuppheating': { today: 38.9, yesterday: 47.2, week: 231.0, month: 812.0, year: 7610.3 },
  'sensor.ems_esp_boiler_totalcompstarts': { today: 4, yesterday: 6, week: 31, month: 118, year: 1102 },
  'sensor.ems_esp_boiler_uptimetotal': { today: 610, yesterday: 790, week: 3950, month: 14200, year: 131000 },
};
// Simulated long-term statistics: change of a total counter per calendar period (recorder/statistic_during_period).
const statChange = (setup, msg) => {
  const c = msg.calendar || {};
  const v = setup.statistics?.[msg.statistic_id]?.[c.period === 'day' ? (c.offset ? 'yesterday' : 'today') : c.period];
  return v === undefined ? Promise.reject(new Error('no statistics')) : Promise.resolve({ change: v });
};
// Simulated history (compact format of the history API, seconds): one day of operating modes, ending in heating.
const historySim = (setup, msg) => {
  const now = Date.now(); const out = {};
  const plan = [[24, 'idle'], [22.5, 'heat'], [20, 'defrost'], [19.6, 'heat'], [17, 'dhw'], [16.3, 'idle'], [12, 'heat'], [8.5, 'defrost'], [8.1, 'heat'], [7, 'dhw'], [6.2, 'heat'], [3, 'defrost'], [2.9, 'heat']];
  for (const id of msg.entity_ids) {
    out[id] = plan.map(([h, k]) => { const v = setup.states(k)[id]; const st = Array.isArray(v) ? v[0] : (v && typeof v === 'object' ? v.state : v); return { s: String(st), lu: (now - h * 3600000) / 1000 }; });
  }
  return Promise.resolve(out);
};
// HeishaMon (Panasonic Aquarea): no operating-mode entity, valve as Room/Tank, flow in L/min, power in W.
const hmStates = (s) => ({
  'sensor.panasonic_heat_pump_main_main_outlet_temp': [{ heat: '36.0', dhw: '50.5', defrost: '23', idle: '30' }[s], '°C'],
  'sensor.panasonic_heat_pump_main_main_inlet_temp': [{ heat: '31.0', dhw: '45.0', defrost: '26', idle: '29.5' }[s], '°C'],
  'sensor.panasonic_heat_pump_main_pump_flow': [s === 'idle' ? '0' : '18.5', 'L/min'],
  'sensor.panasonic_heat_pump_main_compressor_freq': [s === 'idle' ? '0' : '42', 'Hz'],
  'sensor.panasonic_heat_pump_main_threeway_valve_state': s === 'dhw' ? 'Tank' : 'Room',
  'binary_sensor.panasonic_heat_pump_main_defrosting_state': s === 'defrost' ? 'on' : 'off',
  'sensor.panasonic_heat_pump_main_heat_power_consumption': [s === 'idle' ? '0' : '1250', 'W'],
  'sensor.panasonic_heat_pump_main_heat_power_production': [{ heat: '5400', dhw: '4900', defrost: '0', idle: '0' }[s], 'W'],
  'sensor.panasonic_heat_pump_main_outside_temp': ['4.0', '°C'], 'sensor.panasonic_heat_pump_main_dhw_temp': ['48.0', '°C'],
  'number.panasonic_heat_pump_main_dhw_target_temp': ['50', '°C'], 'sensor.panasonic_heat_pump_main_z1_water_temp': ['35.5', '°C'],
  'sensor.panasonic_heat_pump_main_main_target_temp': ['36', '°C'], 'sensor.panasonic_heat_pump_main_z1_temp': ['21.0', '°C'],
});
// Ground source heat pump (EMS-ESP, no instance prefix): brine loop, two circuits, DHW heater rod and backup heater.
const brineStates = (s) => ({
  'sensor.boiler_hpactivity': { heat: 'Heizen', dhw: 'Warmwasser', defrost: 'Heizen', idle: 'aus' }[s],
  'binary_sensor.boiler_hpcompon': s === 'idle' ? 'off' : 'on', 'binary_sensor.boiler_hp3way': s === 'dhw' ? 'on' : 'off',
  'sensor.boiler_hpcurrpower': [{ heat: '1650', dhw: '2100', defrost: '1700', idle: '0' }[s], 'W'],
  'sensor.boiler_hptc1': [{ heat: '36.5', dhw: '53.0', defrost: '38.0', idle: '29' }[s], '°C'],
  'sensor.boiler_hptc0': [{ heat: '31.5', dhw: '47.0', defrost: '33.0', idle: '28.5' }[s], '°C'],
  'sensor.boiler_pc0flow': [s === 'idle' ? '0' : '1250', 'l/h'],
  'sensor.boiler_hpbrinein': [s === 'idle' ? '9.8' : '8.4', '°C'], 'sensor.boiler_hpbrineout': [s === 'idle' ? '9.6' : '5.1', '°C'],
  'sensor.boiler_outdoortemp': ['-6.5', '°C'], 'sensor.boiler_dhw_curtemp': ['49.5', '°C'], 'sensor.boiler_dhw_seltemp': ['55', '°C'],
  'binary_sensor.boiler_auxheaterstatus': s === 'defrost' ? 'on' : 'off',
  'binary_sensor.dhw_heater_rod': s === 'dhw' ? 'on' : 'off',
  'sensor.mixer_hc1_flowtemphc': ['33.0', '°C'], 'binary_sensor.mixer_hc1_pumpstatus': ['heat', 'defrost'].includes(s) ? 'on' : 'off',
  'sensor.mixer_hc2_flowtemphc': ['45.5', '°C'], 'binary_sensor.mixer_hc2_pumpstatus': s === 'heat' || s === 'defrost' ? 'on' : 'off',
  'sensor.thermostat_hc1_currtemp': ['21.2', '°C'], 'sensor.thermostat_hc1_seltemp': ['21.5', '°C'],
});
// Samsung EHS (esphome-samsung-nasa): entity names of Beormund's example.yaml, valve and error code as text sensors.
const samsungStates = (s) => ({
  'sensor.heat_pump_flow_temp_out': [{ heat: '32.6', dhw: '45.1', defrost: '22.0', idle: '28.0' }[s], '°C'],
  'sensor.heat_pump_flow_temp_return': [{ heat: '30.5', dhw: '40.3', defrost: '25.5', idle: '27.5' }[s], '°C'],
  'sensor.heat_pump_flow_rate_sensor': [s === 'idle' ? '0' : '14.5', 'L/min'],
  'binary_sensor.heat_pump_compressor_status': s === 'idle' ? 'off' : 'on',
  'sensor.heat_pump_compressor_frequency': [{ heat: '47', dhw: '58', defrost: '62', idle: '0' }[s], 'Hz'],
  'sensor.heat_pump_3_way_valve': s === 'dhw' ? 'Tank (DHW)' : 'Room (Heating)',
  'binary_sensor.heat_pump_defrost': s === 'defrost' ? 'on' : 'off',
  'binary_sensor.heat_pump_primary_water_pump': s === 'idle' ? 'off' : 'on',
  'binary_sensor.heat_pump_booster_heater': 'off',
  'sensor.heat_pump_power_consumed_last_minute': [{ heat: '1190', dhw: '1450', defrost: '1300', idle: '12' }[s], 'W'],
  'sensor.heat_pump_power_produced_last_minute': [{ heat: '4300', dhw: '4700', defrost: '0', idle: '0' }[s], 'W'],
  'sensor.heat_pump_outdoor_temperature': ['9.3', '°C'],
  'sensor.heat_pump_dhw_temperature': [s === 'dhw' ? '38.2' : '42.4', '°C'],
  'number.heat_pump_dhw_target_temperature': { state: '43', attributes: { unit_of_measurement: '°C', min: 30, max: 50, step: 1 } },
  'sensor.heat_pump_zone_1_indoor_temp': ['20.8', '°C'], 'number.heat_pump_zone_1_target_temp': ['21', '°C'],
  'sensor.heat_pump_error_code': s === 'idle' ? 'Communication Error (ODU Time-out 3m)' : 'No Error',
  'switch.heat_pump_away_mode': 'off',
  'sensor.heat_pump_total_consumed_energy': { state: '1843.2', attributes: { unit_of_measurement: 'kWh', state_class: 'total_increasing' } },
  'sensor.heat_pump_total_produced_energy': { state: '6912.0', attributes: { unit_of_measurement: 'kWh', state_class: 'total_increasing' } },
  'sensor.heat_pump_daily_energy_consumed': ['4.3', 'kWh'], 'sensor.heat_pump_daily_heat_generated': ['16.1', 'kWh'],
  'sensor.heat_pump_cop_daily': '3.74', 'sensor.heat_pump_cop_total': '3.75',
});
const regOf = (fn, platform) => Object.fromEntries(Object.keys(fn('heat')).map((id) => [id, { platform }]));

// Energy dashboard of the simulated house: power sensors (stat_rate) for PV, battery (+ = discharging) and grid (+ = import).
const energyPrefs = { energy_sources: [
  { type: 'solar', stat_energy_from: 'sensor.pv_energy_today', stat_rate: 'sensor.pv_power' },
  { type: 'battery', stat_energy_from: 'sensor.battery_out_today', stat_energy_to: 'sensor.battery_in_today', stat_rate: 'sensor.battery_power' },
  { type: 'grid', stat_energy_from: 'sensor.grid_import_today', stat_energy_to: 'sensor.grid_export_today', stat_rate: 'sensor.grid_power' },
] };
const houseStates = (s) => ({
  'sensor.pv_power': [{ heat: '1800', dhw: '300', defrost: '0', idle: '900' }[s], 'W'],
  'sensor.battery_power': [{ heat: '-300', dhw: '1400', defrost: '0', idle: '-480' }[s], 'W'],
  'sensor.grid_power': [{ heat: '200', dhw: '100', defrost: '1500', idle: '-150' }[s], 'W'],
});

const setups = [
  {
    name: 'Lambda', sub: 'legacy naming, PV/battery split, quick controls, own tile selection, details with refrigerant circuit',
    states: (s) => ({ ...lambdaStates('eu08l_', s), ...extras(s) }),
    statistics: { 'sensor.eu08l_hp1_heating_energy_total': { yesterday: 12.9, week: 61.3 } },
    config: {
      preset: 'lambda', title: 'Lambda', hc_type: 'radiator', timeline: true,
      entities: {
        room: 'sensor.living_room_temperature', pv: 'sensor.heatpump_power_from_pv', battery: 'sensor.heatpump_power_from_battery',
        grid: 'sensor.heatpump_power_from_grid', energy_today: 'sensor.heatpump_energy_today', pv_share_today: 'sensor.heatpump_pv_share_today',
        program: 'select.heatpump_heating_program', solar_collector: 'sensor.heatpump_solar_collector', solar_pump: 'binary_sensor.heatpump_solar_pump',
      },
      badges: [{ entity: 'input_boolean.heatpump_boost', label: 'Boost' }],
      controls: ['input_boolean.heatpump_boost', 'button.heatpump_dhw_boost', 'select.heatpump_operating_mode', 'number.heatpump_dhw_target'],
      details: [{ entity: 'sensor.heating_curve_flow', name: 'Heating curve flow' }],
      details_open: true,
      tiles: ['cop_heating', 'cop_heating:month', 'cop_dhw', 'energy', 'starts', 'defrosts:yesterday', 'energy_heating:week'],
    },
  },
  {
    name: 'Lambda', sub: 'new naming, zero-config, PV/battery/grid from the Energy dashboard',
    states: (s) => ({ ...lambdaStates('', s), ...houseStates(s) }),
    energy: energyPrefs,
    config: { preset: 'lambda' },
  },
  {
    name: 'Viessmann Vitocal', sub: 'ViCare, German entity ids, radiators',
    states: vicareStates,
    registry: Object.fromEntries(Object.entries(vicareReg).map(([id, tk]) => [id, { platform: 'vicare', translation_key: tk }])),
    config: { preset: 'vicare', title: 'Vitocal', hc_type: 'radiator' },
  },
  {
    name: 'Vaillant aroTHERM plus', sub: 'myPyllant',
    states: vaillantStates,
    registry: { 'sensor.zuhause_energy_manager_state': { platform: 'mypyllant' } },
    config: { preset: 'vaillant', title: 'aroTHERM plus' },
  },
  {
    name: 'Buderus / Bosch', sub: 'EMS-ESP, German enum texts, tiles for today and month from long-term statistics',
    states: emsStates, registry: regOf(emsStates, 'mqtt'), statistics: emsStatistics,
    config: {
      preset: 'emsesp', title: 'Buderus WLW',
      tiles: ['cop_heating', 'energy_heating', 'cop_heating:month', 'starts', 'hours_per_start', 'spread', 'heat_estimated'],
    },
  },
  {
    name: 'Panasonic Aquarea', sub: 'HeishaMon, radiators',
    states: hmStates, registry: regOf(hmStates, 'aquarea'),
    config: { preset: 'heishamon', title: 'Aquarea', hc_type: 'radiator' },
  },
  {
    name: 'Ground source heat pump', sub: 'EMS-ESP, brine loop, two heating circuits, heater rod and backup heater',
    states: brineStates, registry: regOf(brineStates, 'mqtt'),
    scenarioLabels: { defrost: 'Backup heater' },
    config: {
      preset: 'emsesp', title: 'Logatherm WLW', source_type: 'brine',
      hc_count: 2, hc_name: 'Ground floor', hc2_type: 'radiator', hc2_name: 'Upstairs',
      entities: { dhw_heater: 'binary_sensor.dhw_heater_rod' },
    },
  },
  {
    name: 'Samsung EHS', sub: 'esphome-samsung-nasa, underfloor heating',
    states: samsungStates, registry: regOf(samsungStates, 'esphome'),
    config: { preset: 'samsung', title: 'Samsung EHS' },
  },
  {
    name: 'Any other heat pump', sub: 'no preset: manual mapping, no buffer, no power sources',
    states: otherStates,
    config: {
      title: 'Heat pump',
      entities: { mode: 'sensor.wp_betriebsart', flow: 'sensor.wp_vorlauf', return: 'sensor.wp_ruecklauf', power: 'sensor.wp_leistung',
        dhw_top: 'sensor.ww_temperatur', outdoor: 'sensor.aussen', hc_pump: 'binary_sensor.heizkreispumpe' },
      mode_map: { Heating: 'heating', 'Hot water': 'dhw', Defrost: 'defrost', Standby: 'idle' },
    },
  },
];
const scenarios = [['heat', 'Heating'], ['dhw', 'Hot water'], ['defrost', 'Defrost'], ['idle', 'Standby + error']];
