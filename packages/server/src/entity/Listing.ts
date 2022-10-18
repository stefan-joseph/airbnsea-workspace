import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity("listings")
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("varchar", { length: 100 })
  category: string;

  @Column("text")
  imgUrl: string;

  @Column("varchar", { length: 1000 })
  description: string;

  @Column("int")
  price: number;

  @Column("int")
  beds: number;

  @Column("int")
  guests: number;

  @Column("double precision")
  latitude: number;

  @Column("double precision")
  longitude: number;

  @Column("text", { array: true })
  amenities: string[];

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, (user) => user.listings)
  user: User;
}
