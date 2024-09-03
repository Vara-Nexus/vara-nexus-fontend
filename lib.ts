import { GearApi, decodeAddress } from '@gear-js/api';
import { TypeRegistry } from '@polkadot/types';
import { TransactionBuilder, ActorId } from 'sails-js';

export interface ResultDaoInfoForResultTokenInfo {
  name: string;
  description: string;
  token: ResultTokenInfo;
}

export interface ResultTokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: number | string | bigint;
}

export class Program {
  public readonly registry: TypeRegistry;
  public readonly nexusDao: NexusDao;

  constructor(public api: GearApi, public programId?: `0x${string}`) {
    const types: Record<string, any> = {
      ResultDaoInfoForResultTokenInfo: {"name":"String","description":"String","token":"ResultTokenInfo"},
      ResultTokenInfo: {"name":"String","symbol":"String","decimals":"u8","total_supply":"U256"},
    }

    this.registry = new TypeRegistry();
    this.registry.setKnownTypes({ types });
    this.registry.register(types);

    this.nexusDao = new NexusDao(this);
  }

  newCtorFromCode(code: Uint8Array | Buffer): TransactionBuilder<null> {
    const builder = new TransactionBuilder<null>(
      this.api,
      this.registry,
      'upload_program',
      'New',
      'String',
      'String',
      code,
    );

    this.programId = builder.programId;
    return builder;
  }

  newCtorFromCodeId(codeId: `0x${string}`) {
    const builder = new TransactionBuilder<null>(
      this.api,
      this.registry,
      'create_program',
      'New',
      'String',
      'String',
      codeId,
    );

    this.programId = builder.programId;
    return builder;
  }
}

export class NexusDao {
  constructor(private _program: Program) {}

  public addAdmin(dao_name: string, new_admin: ActorId): TransactionBuilder<null> {
    if (!this._program.programId) throw new Error('Program ID is not set');
    return new TransactionBuilder<null>(
      this._program.api,
      this._program.registry,
      'send_message',
      ['NexusDao', 'AddAdmin', dao_name, new_admin],
      '(String, String, String, [u8;32])',
      'Null',
      this._program.programId
    );
  }

  public createDao(name: string, description: string, token_actor: ActorId): TransactionBuilder<null> {
    if (!this._program.programId) throw new Error('Program ID is not set');
    return new TransactionBuilder<null>(
      this._program.api,
      this._program.registry,
      'send_message',
      ['NexusDao', 'CreateDao', name, description, token_actor],
      '(String, String, String, String, [u8;32])',
      'Null',
      this._program.programId
    );
  }

  public async getDaoInfo(name: string, originAddress?: string, value?: number | string | bigint, atBlock?: `0x${string}`): Promise<ResultDaoInfoForResultTokenInfo | null> {
    const payload = this._program.registry.createType('(String, String, String)', ['NexusDao', 'GetDaoInfo', name]).toHex();
    const reply = await this._program.api.message.calculateReply({
      destination: this._program.programId,
      origin: originAddress ? decodeAddress(originAddress) : ZERO_ADDRESS,
      payload,
      value: value || 0,
      gasLimit: this._program.api.blockGasLimit.toBigInt(),
      at: atBlock || null,
    });
    if (!reply.code.isSuccess) throw new Error(this._program.registry.createType('String', reply.payload).toString());
    const result = this._program.registry.createType('(String, String, Option<ResultDaoInfoForResultTokenInfo>)', reply.payload);
    return result[2].toJSON() as unknown as ResultDaoInfoForResultTokenInfo | null;
  }

  public async getDaosByActor(actor: ActorId, originAddress?: string, value?: number | string | bigint, atBlock?: `0x${string}`): Promise<Array<string> | null> {
    const payload = this._program.registry.createType('(String, String, [u8;32])', ['NexusDao', 'GetDaosByActor', actor]).toHex();
    const reply = await this._program.api.message.calculateReply({
      destination: this._program.programId,
      origin: originAddress ? decodeAddress(originAddress) : ZERO_ADDRESS,
      payload,
      value: value || 0,
      gasLimit: this._program.api.blockGasLimit.toBigInt(),
      at: atBlock || null,
    });
    if (!reply.code.isSuccess) throw new Error(this._program.registry.createType('String', reply.payload).toString());
    const result = this._program.registry.createType('(String, String, Option<Vec<String>>)', reply.payload);
    return result[2].toJSON() as unknown as Array<string> | null;
  }

  public async isAdmin(dao_name: string, user: ActorId, originAddress?: string, value?: number | string | bigint, atBlock?: `0x${string}`): Promise<boolean> {
    const payload = this._program.registry.createType('(String, String, String, [u8;32])', ['NexusDao', 'IsAdmin', dao_name, user]).toHex();
    const reply = await this._program.api.message.calculateReply({
      destination: this._program.programId,
      origin: originAddress ? decodeAddress(originAddress) : ZERO_ADDRESS,
      payload,
      value: value || 0,
      gasLimit: this._program.api.blockGasLimit.toBigInt(),
      at: atBlock || null,
    });
    if (!reply.code.isSuccess) throw new Error(this._program.registry.createType('String', reply.payload).toString());
    const result = this._program.registry.createType('(String, String, bool)', reply.payload);
    return result[2].toJSON() as unknown as boolean;
  }
}