import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Listing } from "./Listing";
import { User } from "./User";

@Entity("messages")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  text: string;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column("uuid")
  listingId: string;

  @ManyToOne(() => Listing)
  listing: Listing;
}
