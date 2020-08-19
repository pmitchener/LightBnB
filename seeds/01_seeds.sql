INSERT INTO users (name, email, password) 
VALUES ('Eva Stanley', 'sebastianGuerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sue Luna', 'jasonvincent@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id,   title,  description,  thumbnail_photo_url,   cover_photo_url, cost_per_night,
  parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES (1, 'Blank corner', 'We drew a blank here',
  'http://images.pixels.com/photo/123/blankhousethumb.jpg', 'http://images.pixels.com/photo/123/blankhousecover.jpg',
  93061, 2, 4, 7, 'Canada', '0. Nothing to see here Ave.', 'Toronto', 'ON', 'A2B C2D'),

  (2, 'Painted corner', 'We painted a big picture here',
  'http://images.pixels.com/photo/123/paintmebluethumb.jpg', 'http://images.pixels.com/photo/123/paintmebluecover.jpg',
  193061, 4, 8, 16, 'Canada', '1. Nose in ther air ways.', 'Toronto', 'ON', 'G0L D3N'),

  (3, 'Money Maker', 'We spare no cost. Go big money or stay in you own shack.',
  'http://images.pixels.com/photo/123/momoneythumb.jpg', 'http://images.pixels.com/photo/123/momoneycover.jpg',
  4000000, 8, 24, 40, 'Canada', '411. We got cash$$$.', 'Toronto', 'ON', 'M0N 3YS'),  

  (4, 'Good neighbour', 'We enourage late paries. All your neighbours will be sleeping at that time.',
  'http://images.pixels.com/photo/123/bestneighbourthumb.jpg', 'http://images.pixels.com/photo/123/bestneighbourcover.jpg',
  53061, 1, 1, 2, 'Canada', '911. Sink hole.', 'Toronto', 'ON', 'F0N 2N3');  

  INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES ('2020-08-01', '2020-09-12', 2, 4),
  ('2020-08-04', '2020-09-30', 2, 2),
  ('2020-09-010', '2020-10-30', 3, 3),
  ('2020-07-04', '2020-09-30', 4, 3),

  ('2020-08-04', '2020-09-30', 1, 1),
  ('2020-09-010', '2020-10-30', 3, 4),
  ('2020-07-04', '2020-09-30', 2, 2);

  INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES (2, 4, 1, 10, 'You cannot imagine'),
  (1, 3, 2, 8, 'Color me satisfied. I ony have a few minor irksome points.'),
  (3, 1, 1, 3, 'Kind of cheap. I mean really, they could not get 14 krat railings. the 10 karat seems a little underwhelming.'),
  (4, 4, 1, 10, 'Off the wall');
  