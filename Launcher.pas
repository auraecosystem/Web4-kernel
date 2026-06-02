program Web4Cluster;

{$mode objfpc}{$H+}

uses
  SysUtils, Process;

begin
  Writeln('[BOOT] Web4 Self-Healing Cluster Starting...');

  Sleep(1000);

  ExecuteProcess('node', 'cluster/supervisor.js');

  Writeln('[BOOT] Supervisor launched');
end.
