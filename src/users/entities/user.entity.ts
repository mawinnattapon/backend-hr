import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  // ข้อมูลส่วนตัว
  @Column({ length: 20, nullable: true })
  employeeId: string; // รหัสพนักงาน

  @Column({ type: 'date', nullable: true })
  birthDate: Date; // วันเกิด

  @Column({ length: 20, nullable: true })
  phone: string; // เบอร์โทรศัพท์

  @Column({ length: 100, nullable: true })
  address: string; // ที่อยู่

  // ข้อมูลการทำงาน
  @Column({ length: 100, nullable: true })
  position: string; // ตำแหน่ง

  @Column({ length: 100, nullable: true })
  department: string; // แผนก

  @Column({ type: 'date', nullable: true })
  startDate: Date; // วันที่เริ่มงาน

  @Column({ type: 'date', nullable: true })
  endDate: Date; // วันที่สิ้นสุดสัญญา

  @Column({ type: 'int', nullable: true })
  contractPeriod: number; // ระยะเวลาสัญญา (เดือน)

  // ข้อมูลเงินเดือนและสวัสดิการ
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number; // เงินเดือน

  @Column({ length: 50, nullable: true })
  bankAccount: string; // เลขบัญชีธนาคาร

  @Column({ length: 100, nullable: true })
  taxId: string; // เลขประจำตัวผู้เสียภาษี

  @Column({ default: false })
  hasHealthInsurance: boolean; // ประกันสุขภาพ

  @Column({ default: false })
  hasSocialSecurity: boolean; // ประกันสังคม

  @Column({ default: false })
  hasProvidentFund: boolean; // กองทุนสำรองเลี้ยงชีพ

  @Column({ default: false })
  updateBy: string;

  @Column({ default: false })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
