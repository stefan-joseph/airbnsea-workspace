import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Status, VesselType } from "../types/types";
import { Booking } from "./Booking";
import { User } from "./User";

@Entity("listings")
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  @Column({
    type: "enum",
    enum: VesselType,
  })
  "vesselType": VesselType;

  @Column("varchar")
  street: string;

  @Column("varchar", { nullable: true })
  apt: string | null;

  @Column("varchar")
  city: string;

  @Column("varchar", { nullable: true })
  state: string | null;

  @Column("varchar")
  country: string;

  @Column("varchar")
  zipcode: string;

  @Column("double precision")
  latitude: number;

  @Column("double precision")
  longitude: number;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("text", { array: true })
  photos: string[];

  @Column("text")
  description: string;

  @Column("int")
  price: number;

  @Column("int")
  beds: number;

  @Column("int")
  guests: number;

  @Column("real")
  rating: number;

  @Column("text", { array: true, nullable: true })
  amenities: string[] | null;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (user) => user.listings)
  user: User;

  @OneToMany(() => Booking, (booking) => booking.listing)
  bookings: Booking[];
}
