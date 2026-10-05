-- Optional starter assets for the seeded Riverton Works plant.
insert into public.assets (plant_id, id, name, type, location, health, temp, vibration, runtime, tag, notes, thresholds) values
('00000000-0000-4000-8000-000000000001','M-204','CNC Mill','Machining','Line 2 · Cell B',62,'86°C','8.4 mm/s','94.2%','Critical','Spindle bearing temperature and vibration above operating baseline.','{"temperature_max":85,"vibration_max":7}'),
('00000000-0000-4000-8000-000000000001','P-018','Hydraulic Press','Forming','Press Shop · Bay 4',78,'68°C','2.1 mm/s','97.8%','Watch','Pressure oscillation requires accumulator inspection.','{"pressure_min":172,"pressure_max":188}'),
('00000000-0000-4000-8000-000000000001','C-07','Assembly Conveyor','Material handling','Assembly · Line 1',84,'41°C','1.8 mm/s','99.1%','Healthy','Belt tracking offset trending upward.','{}'),
('00000000-0000-4000-8000-000000000001','L-112','CNC Lathe','Machining','Line 2 · Cell A',88,'59°C','1.2 mm/s','96.5%','Healthy','Coolant concentration below process specification.','{}'),
('00000000-0000-4000-8000-000000000001','R-031','Packaging Robot','Robotics','Packaging · Line 3',73,'52°C','1.4 mm/s','92.7%','Watch','Intermittent guard interlock event.','{}'),
('00000000-0000-4000-8000-000000000001','AC-02','Air Compressor','Utilities','Utilities · Room 1',91,'63°C','0.8 mm/s','99.7%','Healthy','Operating within expected range.','{}')
on conflict (plant_id, id) do nothing;

insert into public.knowledge_documents (plant_id, id, type, title, detail, tags, updated_label) values
('00000000-0000-4000-8000-000000000001','KB-042','PDF','M-204 Spindle Assembly — Service Manual','Bearing inspection, preload tolerances, lubrication intervals, and restart checklist for the M-series spindle assembly.',array['M-204','Spindle','Mechanical'],'Updated 12 Aug 2026'),
('00000000-0000-4000-8000-000000000001','KB-038','SOP','CNC Machine Safe Stop & Lockout','Approved shutdown and lockout sequence for CNC machining centers. Includes isolation points and restart authorization.',array['Safety','CNC','Lockout'],'Updated 02 Sep 2026'),
('00000000-0000-4000-8000-000000000001','KB-031','LOG','M-204 Bearing Replacement — May 2026','Maintenance record from the previous spindle bearing replacement, including wear measurements and vibration readings.',array['M-204','Bearing','History'],'Updated 18 May 2026')
on conflict (plant_id, id) do nothing;
