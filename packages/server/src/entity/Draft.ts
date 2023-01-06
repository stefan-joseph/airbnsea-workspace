import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { VesselType } from "../types/types";
import { User } from "./User";

@Entity("drafts")
export class Draft extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: VesselType,
  })
  "vesselType": VesselType;

  @Column("varchar", { nullable: true })
  street: string | null;

  @Column("varchar", { nullable: true })
  apt: string | null;

  @Column("varchar", { nullable: true })
  city: string | null;

  @Column("varchar", { nullable: true })
  state: string | null;

  @Column("varchar", { nullable: true })
  country: string | null;

  @Column("varchar", { nullable: true })
  zipcode: string | null;

  @Column("double precision", { nullable: true })
  latitude: number | null;

  @Column("double precision", { nullable: true })
  longitude: number | null;

  @Column("varchar", { length: 100, nullable: true })
  name: string | null;

  @Column("text", { array: true, default: "{}" })
  photos: string[];

  @Column("text", { nullable: true })
  description: string | null;

  @Column("int", { nullable: true })
  price: number | null;

  @Column("int", { nullable: true })
  beds: number | null;

  @Column("int", { nullable: true })
  guests: number | null;

  @Column("text", { array: true, nullable: true })
  amenities: string[] | null;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (user) => user.drafts)
  user: User;
}
