import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";

import { Listing } from "./Listing";
import { User } from "./User";

@Entity("bookings")
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // format: '[2021-05-15 14:00, 2021-05-16 22:00)'
  @Column("daterange")
  range: string;

  @Column("int")
  guests: number;

  @Column("int")
  pricePerNight: number;

  @Column("int")
  serviceFee: number;

  @Column("int")
  taxes: number;

  @Column("int")
  total: number;

  @Column("uuid")
  listingId: string;

  @ManyToOne(() => Listing, (listing) => listing.bookings)
  listing: Listing;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
