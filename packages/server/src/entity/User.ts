import { hash } from "bcryptjs";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
  OneToMany,
} from "typeorm";

import { AuthorizationServer } from "../types/types";
import { Booking } from "./Booking";
import { Listing } from "./Listing";
import { Draft } from "./Draft";
import { Message } from "./Message";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 255,
    unique: true,
  })
  email: string;

  @Column("text", { nullable: true })
  password: string | null;

  @Column({
    type: "enum",
    enum: AuthorizationServer,
    nullable: true,
  })
  oAuth: AuthorizationServer;

  @Column("varchar", { length: 50 })
  firstName: string;

  @Column("varchar", { length: 50, nullable: true })
  lastName: string | null;

  @Column("text", { nullable: true })
  avatar: string | null;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column("boolean", { default: false })
  locked: boolean;

  @Column("text", { nullable: true })
  facebookId: string | null;

  @OneToMany(() => Listing, (listing) => listing.user)
  listings: Listing[];

  @OneToMany(() => Draft, (draft) => draft.user)
  drafts: Draft[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => Message, (message) => message.guestUser)
  guestMessages: Message[];

  @OneToMany(() => Message, (message) => message.hostUser)
  hostMessages: Message[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}
