---
title: Q Network under Dissipation
date: 2026-01-26
tags:
  - Minimal-M
  - Q-network
  - Dissipation
  - Liouvillian-Gap
---
# Dissipative Quantum Dynamics in Static Network with Different Topologies

## 1. 核心概念 (Core Concept)
研究**静态网络拓扑结构**（Topology）如何影响在**耗散环境**下的量子动力学。探讨网络连接性（密度、均匀性）与量子相干性（Coherence）寿命之间的演化关系。

---

## 2. 物理模型 (The Model)

### 2.1 哈密顿量 (System Hamiltonian)
系统由 $N$ 个相互作用的 **Ising Spins** 组成：
$$H_S = -\sum_{i<j} A_{ij} J_{ij} \sigma_i^z \sigma_j^z - \sum_i h_i \sigma_i^x$$
其中 $A_{ij}$ 是网络的**邻接矩阵 (Adjacency Matrix)**。

### 2.2 演化方程 (Master Equation)
使用 **Lindblad 形式** 的量子主方程：
$$\frac{d\rho(t)}{dt} = \mathcal{L}\rho = -i[H_S, \rho(t)] + \sum_k \gamma_k \left( L_k \rho L_k^\dagger - \frac{1}{2} \{L_k^\dagger L_k, \rho\} \right)$$
其中 $\mathcal{L}$ 为**刘维尔算符 (Liouvillian Operator)**。

---

## 3. 动力学衡量指标 (Metrics of Dynamics)
为了定量描述“寿命”，文中采用了以下指标：

### 3.1 量子相干性 $l_1$-范数 ($l_1$-norm of Coherence)
用于衡量全局量子特性的衰减速度：
$$C(\rho(t)) = \sum_{i \neq j} |\rho_{ij}(t)|$$

### 3.2 迹距离 (Trace Distance)
用于衡量系统状态 $\rho(t)$ 趋近稳态 $\rho_{ss}$ 的过程：
$$D(\rho(t), \rho_{ss}) = \frac{1}{2} \text{Tr} \sqrt{(\rho(t)-\rho_{ss})^\dagger (\rho(t)-\rho_{ss})}$$

### 3.3 刘维尔谱间隙 (Liouvillian Spectral Gap)
**决定寿命的核心数学量**。设 $\mathcal{L}$ 的特征值为 $\lambda_i$，按实部排序 $0 = \text{Re}(\lambda_0) > \text{Re}(\lambda_1) \geq \text{Re}(\lambda_2) \dots$：
$$\Delta = |\text{Re}(\lambda_1)|$$
> [!IMPORTANT] 结论
> 系统的最长弛豫时间（Relaxation Time）尺度由 $\tau \sim 1/\Delta$ 决定。**谱间隙越小，量子态存续寿命越长。**

---

## 4. 核心结论 (Key Results)

### 4.1 密度与寿命 (Structural Rigidity)
- **现象:** 网络连接越紧密（平均度 $\langle k \rangle$ 越大），量子相干性消失越慢。
- **机制:** 高连通性增强了系统的“结构刚性”，单一节点的局部耗散难以迅速破坏全局相干态。

### 4.2 均匀性与演化速度 (Inhomogeneity)
- **异质网络（如星型网络）:** 演化速度极快。枢纽节点（Hubs）作为强耗散通道，加速了能量泄露。
- **同质网络（如正则随机图）:** 节点地位均等，刘维尔谱间隙 $\Delta$ 较小，演化具有“惯性”，相干性寿命长。

### 4.3 性能排序 (Coherence Retention)
1.  **Full-connected (全连接)** - 最慢弛豫，相干性最持久。
2.  **Regular Random (正则随机)** - 均匀性保障了稳定性。
3.  **Erdős–Rényi (随机)** - 表现中等。
4.  **Star Network (星型)** - 最快弛豫，相干性瞬间坍缩。

---

## 5. 跨学科视角：量子与社会的类比
| 维度 | 量子系统 | 社会网络 |
| :--- | :--- | :--- |
| **状态演化** | 趋向热平衡 (Decoherence) | 趋向社会共识 (Consensus) |
| **枢纽节点** | 加速向环境泄露能量 | 加速信息传播与观点统一 |
| **拓扑影响** | 均匀网络演化慢 (寿命长) | 均匀群体共识达成慢 |

---

## 6. 思考与链接
- [[Open Quantum Systems]]
- [[Eigenstate Thermalization Hypothesis]] : 探讨该拓扑效应是否会修正 ETH 的热化时间尺度。
- [[Liouvillian Gap Analysis]] : 进一步研究不同拓扑邻接矩阵 $A$ 的谱分布如何映射到 $\mathcal{L}$ 的谱间隙上。

Reference: https://arxiv.org/pdf/2601.15439